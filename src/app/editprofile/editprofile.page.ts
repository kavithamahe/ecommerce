import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  id: any;
  param: string;
  mobile: any;
  email: any;
  name: any;
  user_id: any;
  getprofile:any=[];
  profile= { name: '',email:'',mobile:''};
  addresss= { address: '',landmark:'',city:'',state:'',zipcode:''};
  type:any;
  getaddress:any=[];
  constructor(private route: ActivatedRoute,private router: Router,public productservice:ProductsService) { 
    this.user_id = localStorage.getItem("user_id");
    this.param = route.snapshot.paramMap.get('param');
    this.type = route.snapshot.paramMap.get('type');
    this.id = route.snapshot.paramMap.get('id');
    if(this.type == 'address'){
      this.getsingleaddress(this.id);
    }
    this.getprofileDetail(this.user_id);
  }

  ngOnInit() {
    
  }
  ionViewWillEnter(){
    this.user_id = localStorage.getItem("user_id");
    this.param = this.route.snapshot.paramMap.get('param');
    this.type = this.route.snapshot.paramMap.get('type');
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.type == 'address'){
      this.getsingleaddress(this.id);
    }
    this.getprofileDetail(this.user_id);
  }
  getsingleaddress(id){
    this.productservice.presentLoading();
    this.productservice.viewsingleaddress(id)
    .subscribe(address =>{ 
      this.getaddress = address.data;
      this.productservice.loadingdismiss();
    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message);
   })
  }
  getprofileDetail(user_id){
    this.productservice.presentLoading();
    this.productservice.getprofile(user_id)
    .subscribe(profile =>{ 
      this.getprofile = profile.data;
      this.name = this.getprofile[0].firstname;
      this.email = this.getprofile[0].email;
      this.mobile = this.getprofile[0].mobile;
      this.productservice.loadingdismiss();

    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message);
   })
  }
  editprofile(){
    if(this.profile.name == ""){
      this.name = this.name;
    }
    else{
      this.name = this.profile.name;
    }
    if(this.profile.email == ""){
      this.email = this.email;
    }
    else{
      this.email = this.profile.email;
    }
    if(this.profile.mobile == ""){
      this.mobile = this.mobile;
    }
    else{
      this.mobile = this.profile.mobile;
    }
    this.productservice.presentLoading();
    this.productservice.editprofile(this.user_id,this.name,this.email,this.mobile)
    .subscribe(profile =>{ 
      this.productservice.loadingdismiss();
      this.productservice.presentToast(profile.message);
      this.router.navigate(['profile']);
    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message);
   })
  }
  editaddress(id){
    this.productservice.presentLoading();
    this.productservice.editaddress(id,this.addresss)
    .subscribe(editadd =>{ 
      this.productservice.loadingdismiss();
      this.productservice.presentToast(editadd.message);
      this.router.navigate(['profile']);
    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message);
   })
  }

}
