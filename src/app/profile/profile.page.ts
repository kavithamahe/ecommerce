import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  mobile: any;
  email: any;
  name: any;
  user_id: any;
  getprofile:any=[];
  getaddresslist:any=[];
  constructor(private route: ActivatedRoute,private router: Router,public productservice:ProductsService) { 
    this.user_id = localStorage.getItem("user_id");
    this.getprofileDetail(this.user_id);
    this.getAddress(this.user_id);
  }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.user_id = localStorage.getItem("user_id");
    this.getprofileDetail(this.user_id);
    this.getAddress(this.user_id);
  }
  getprofileDetail(user_id){
    this.productservice.presentLoading();
    this.productservice.getprofile(user_id)
    .subscribe(profile =>{ 
      this.productservice.loadingdismiss();
      this.getprofile = profile.data;
      this.name = this.getprofile[0].firstname;
      this.email = this.getprofile[0].email;
      this.mobile = this.getprofile[0].mobile;
    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message);
   })
  }
  getAddress(user_id){
    this.productservice.presentLoading();
    this.productservice.getaddress(user_id)
    .subscribe(profile =>{ 
      this.getaddresslist = profile.data;
      this.productservice.loadingdismiss();
    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message);
   })
  }
  editname(){
    this.router.navigate(['editprofile',{"param":"name","type":"personnal"}]);
  }
  editemail(){
    this.router.navigate(['editprofile',{"param":"email","type":"personnal"}]);
  }
  editmobile(){
    this.router.navigate(['editprofile',{"param":"mobile","type":"personnal"}]);
  }
  editaddress(id){
    this.router.navigate(['editprofile',{"type":"address","id":id}]);
  }
  removeaddress(id){
    this.productservice.presentLoading();
    this.productservice.removeaddress(id)
    .subscribe(profile =>{ 
      this.productservice.loadingdismiss();
      this.productservice.presentToast(profile.message);
      this.getAddress(this.user_id);
    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message);
   })
  }
}
