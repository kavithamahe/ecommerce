import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { environment } from '../../environments/environment';
import { ToastController, Events } from '@ionic/angular';

@Component({
  selector: 'app-viewsingleproduct',
  templateUrl: './viewsingleproduct.page.html',
  styleUrls: ['./viewsingleproduct.page.scss'],
})
export class ViewsingleproductPage implements OnInit {
  cartcount: any;
  cartDetails: any;
  token: string;
  private imageUrl = environment.imageUrl;
  imgURl: any;
  getsingleProductList:any =[];
  singleid: any;
  quantities: Array<number> = [];
  getProductLists:any;
  data: any;
  item_qty :any=1;
  gotocart:boolean=false;
  constructor(public events: Events,public productservice:ProductsService,private route: ActivatedRoute,public router:Router,public toastController: ToastController) { 
    this.singleid = route.snapshot.paramMap.get('id');
    this.getsingleproductlist(this.singleid);
    this.getproductList();
  }
  ionViewWillEnter(){
    this.events.subscribe('cart', ()=>{
      this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
      if(this.cartDetails){
        this.cartcount = this.cartDetails.length;
      }
    })
    this.singleid = this.route.snapshot.paramMap.get('id');
    this.getsingleproductlist(this.singleid);
    this.getproductList();
  }
  ngOnInit() {
    this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
    if(this.cartDetails){
      this.cartcount = this.cartDetails.length;
    }
    this.token = localStorage.getItem('token');
    this.imgURl = this.imageUrl;
    for (let i = 1; i <= 100; i++) {
      this.quantities.push(i)
    }
  }
  incrementQty(){
    this.item_qty += 1;
    }
    
   
    decrementQty(){
    if(this.item_qty-1 < 1){
      this.item_qty = 1;
    }
    else{
      this.item_qty -= 1;
    }
    }
    viewcart(){
      this.router.navigate(['/viewcartproduct']);
    }
  getproductList(){
    this.productservice.presentLoading();
    this.productservice.getproductlist('','','','')
    .subscribe(product =>{ 
      this.getProductLists = product.data;
      this.productservice.loadingdismiss();
    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message);
   })
  }
  getsingleproductlist(id){
    this.productservice.presentLoading();
    this.productservice.getproductlistsingle(id)
    .subscribe(product =>{ 
      this.getsingleProductList = product.data;
      this.productservice.loadingdismiss();
    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message);
   })
  }
  addproductTocart(id,item_qty,price){
    var item_qtystr = item_qty.toString();
    let toatlprice = (item_qtystr * price);
    if(item_qtystr == ""){
      this.presentToast("Please Select The Quantity");
    }
    else{
    this.data = this.getProductLists.find(x => x.id == id)
    let total_price = {"totalproductprice":toatlprice};
    let quantityperproduct = {"quantityperproduct":item_qtystr};
    var obj = Object.assign(this.data, quantityperproduct,total_price);
    console.log(obj)
    var existingEntries = JSON.parse(localStorage.getItem("cart_items") || '[]');

// Add item if it's not already in the array, then store array again
    if (!existingEntries.includes(this.data)) {
      existingEntries.push(this.data);
      localStorage.setItem("cart_items", JSON.stringify(existingEntries));
      this.events.publish('cart');
      this.gotocart = true;
    }else{
      // or tell user it's already there
      console.log(this.data + ' already exists')
    }
  }
  }
  gotocartpage(){
    this.router.navigate(['/viewcartproduct']);
  }
  async presentToast(datamessage) {
    const toast = await this.toastController.create({
      message: datamessage,
      duration: 2000
    });
    toast.present();
  }
  buyNow(id,item_qty){
    if(item_qty == ""){
      this.presentToast("Please Select The Quantity");
    }
    else{
      if(this.token){
        this.router.navigate(['proceedcheckout',{"id":id,"quantity":item_qty}]);
      }
      else{
    this.router.navigate(['checkout',{"id":id,"quantity":item_qty}]);
      }
    }
    }
}
