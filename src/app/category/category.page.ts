import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  imgURl: any;
  cartcount: any;
  cartDetails: any;
  private imageUrl = environment.imageUrl;
  getallcategories:any=[];
  constructor(private router: Router,public events: Events,public productservice:ProductsService) {
    this.getCategory();
   }

  ngOnInit() {
    this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
    if(this.cartDetails){
      this.cartcount = this.cartDetails.length;
    }
    this.imgURl = this.imageUrl;
  }
  ionViewWillEnter(){
    this.getCategory();
    this.events.subscribe('cart', ()=>{
      this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
      if(this.cartDetails){
        this.cartcount = this.cartDetails.length;
      }
    })
  }
  getCategory(){
    this.productservice.presentLoading();
    this.productservice.getCategoryList()
    .subscribe(category =>{ 
      this.getallcategories = category.data;
      this.productservice.loadingdismiss();
    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message);
   })
  }
  viewcart(){
    this.router.navigate(['/viewcartproduct']);
  }
  getsubcategory(id){
      this.router.navigate(['/productbycategory',{"id":id}],{skipLocationChange: true});
  }
}
