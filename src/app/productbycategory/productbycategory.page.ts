import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router,ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-productbycategory',
  templateUrl: './productbycategory.page.html',
  styleUrls: ['./productbycategory.page.scss'],
})
export class ProductbycategoryPage implements OnInit {
  getsubcategorylocal: any;
  cartcount: any;
  cartDetails: any;
  private imageUrl = environment.imageUrl;
  imgURl: any;
  category_id: any;
  getProductLists:any=[];
  sortby = { level: ''};
  sliderConfig = {
    slidesPerView: 3,
    spaceBetween: 6,
    autoplay:true,
    loop:true
  };
  getallsubcategory:any=[];
  constructor(public events: Events,public productservice:ProductsService,public router: Router,private route: ActivatedRoute) { 
    this.category_id = route.snapshot.paramMap.get('id');
    this.filterbyCategory(this.category_id,'','');
    this.getsubcategories(this.category_id);
  }

  ngOnInit() {
    this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
    if(this.cartDetails){
      this.cartcount = this.cartDetails.length;
    }
    this.imgURl = this.imageUrl;
  }
  ionViewWillEnter(){
    this.events.subscribe('cart', ()=>{
      this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
      if(this.cartDetails){
        this.cartcount = this.cartDetails.length;
      }
    })
    this.category_id = this.route.snapshot.paramMap.get('id');
    this.filterbyCategory(this.category_id,'','');
    this.getsubcategories(this.category_id);
  }
  getsubcategories(category_id){
    this.productservice.presentLoading();
    this.productservice.getsubcategory(category_id)
    .subscribe(product =>{ 
      this.getallsubcategory = product.data;
      this.productservice.loadingdismiss();
    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message);
   })
  }
  filterbyCategory(id,getsubcategorylocal,val){
    this.productservice.presentLoading();
    this.productservice.getproductlist(id,getsubcategorylocal,val,'')
    .subscribe(product =>{ 
      this.getProductLists = product.data;
      this.productservice.loadingdismiss();
    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message);
   })
  }
  filterbySubategory(subcategory_id){
    localStorage.setItem('key',subcategory_id);
    this.productservice.presentLoading();
    this.productservice.getproductlist(this.category_id,subcategory_id,'','')
    .subscribe(product =>{ 
      this.getProductLists = product.data;
      this.productservice.loadingdismiss();
    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message);
   })
  }
  viewsingleproduct(id){
    this.router.navigate(['/viewsingleproduct',{"id":id}]);
  }
  sorybyvalue(val){
    this.getsubcategorylocal = localStorage.getItem('key');
    this.filterbyCategory(this.category_id,this.getsubcategorylocal,val);
  }
  viewcart(){
    this.router.navigate(['/viewcartproduct']);
  }
}
