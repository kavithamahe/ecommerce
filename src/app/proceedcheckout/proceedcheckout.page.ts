import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { environment } from '../../environments/environment';
import { Events } from '@ionic/angular';


@Component({
  selector: 'app-proceedcheckout',
  templateUrl: './proceedcheckout.page.html',
  styleUrls: ['./proceedcheckout.page.scss'],
})
export class ProceedcheckoutPage implements OnInit {
  totalpricecart: string;
  productListsfromcart: string;
  cartcount: any;
  cartDetails: any;
  fromcart: string;
  customer_id: any;
  user_id: string;
  price: any;
  totalprice: any;
  obj: any;
  quantityperproduct: { "quantityperproduct": any; };
  private imageUrl = environment.imageUrl;
  quantity: string;
  singleid: any;
  checkoutForm: FormGroup;
  submitAttempt: boolean = false;
  addaddress:boolean = false;
  getsingleProductList:any=[];
  item_qty:any="1";
  getalladdress:any =[];
  address = { addvalue: ''};

  constructor(public events: Events,public formBuilder: FormBuilder,private route: ActivatedRoute,private router: Router,public productservice:ProductsService) {
    this.singleid = route.snapshot.paramMap.get('id');
    this.quantity = route.snapshot.paramMap.get('quantity');
    this.fromcart = route.snapshot.paramMap.get('fromcart');
    this.totalpricecart = route.snapshot.paramMap.get('totalamount');
    this.quantityperproduct = {"quantityperproduct":this.quantity};
    if(this.fromcart != "1"){
      this.getsingleproductlist(this.singleid);
    }
    this.item_qty=+(this.quantity);
    this.user_id = localStorage.getItem("user_id");
    this.allgetAddress(this.user_id);

   }
 
  ngOnInit() {
    this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
    if(this.cartDetails){
      this.cartcount = this.cartDetails.length;
    }
    this.initForm();
    this.user_id = localStorage.getItem("user_id");
  }
  ionViewWillEnter(){
    this.events.subscribe('cart', ()=>{
      this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
      if(this.cartDetails){
        this.cartcount = this.cartDetails.length;
      }
    })
    this.singleid = this.route.snapshot.paramMap.get('id');
    this.quantity = this.route.snapshot.paramMap.get('quantity');
    this.fromcart = this.route.snapshot.paramMap.get('fromcart');
    this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
    this.totalpricecart = this.route.snapshot.paramMap.get('totalamount');
    this.quantityperproduct = {"quantityperproduct":this.quantity};
    if(this.fromcart != "1"){
      this.getsingleproductlist(this.singleid);
    }
    this.item_qty=+(this.quantity);
    this.user_id = localStorage.getItem("user_id");
    this.allgetAddress(this.user_id);
  }
  initForm(){
    this.checkoutForm = this.formBuilder.group({
      first_name: ['', Validators.compose([Validators.required])],
      last_name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      mobilenumber: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      landmark: [''],
      city: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      zipcode: ['', Validators.compose([Validators.required])]
     
       });
  }
  addAddress(){
    this.addaddress = true;
  }
  cancel(){
    this.addaddress = false;
  }
  allgetAddress(user_id){
    this.productservice.presentLoading();
    this.productservice.getaddress(user_id)
    .subscribe(product =>{ 
      this.getalladdress = product.data;
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
      this.productservice.loadingdismiss();
      this.getsingleProductList = product.data;
      this.price = product.data[0].price;
      this.obj = Object.assign(product.data[0], this.quantityperproduct);
      this.totalprice = (product.data[0].price * this.item_qty);
    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message);
   })
  }
  incrementQty(){
    this.item_qty += 1;
    this.totalprice = (this.price * this.item_qty);
    }
    
   
    decrementQty(){
    if(this.item_qty-1 < 1){
      this.item_qty = 1;
      this.totalprice = (this.price * this.item_qty);
    }
    else{
      this.item_qty -= 1;
      this.totalprice = (this.price * this.item_qty);
    }
    }
    submitaddress(){
    let user_id = {"user_id":this.user_id};
    let obj = Object.assign(this.checkoutForm.value,user_id);
    this.productservice.presentLoading();
      this.productservice.addaddress(obj)
    .subscribe(product =>{ 
      this.productservice.loadingdismiss();
      this.addaddress = false;
      this.allgetAddress(this.user_id);
    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message);
   })
  
    }
    radioSelects(event,id) {
      this.customer_id = id;
    }
    proceedtobuycart(){
      if(this.customer_id == "" || this.customer_id == undefined){
        this.productservice.presentToast("Please Select The Delivery Address");
      }
      else{
        this.productservice.presentLoading();
        this.productservice.checkoutcart(this.user_id,this.customer_id,this.cartDetails,this.totalpricecart)
        .subscribe(product =>{ 
          this.productservice.loadingdismiss();
          this.productservice.presentToast(product.message);
          this.router.navigate(['dashboard']);
          localStorage.removeItem('cart_items');
          this.events.publish('cart');
        },
        err =>{
          this.productservice.loadingdismiss();
          this.productservice.presentToast(err.error.message);
       })
      }
      
    }
    proceedtobuy(product_id){
      if(this.customer_id == "" || this.customer_id == undefined){
        this.productservice.presentToast("Please Select The Delivery Address");
      }
      else{
        this.productservice.presentLoading();
        this.productservice.checkout(this.user_id,this.customer_id,product_id,this.totalprice,this.item_qty)
        .subscribe(product =>{ 
          this.productservice.loadingdismiss();
          this.productservice.presentToast(product.message);
          this.router.navigate(['dashboard']);
         
        },
        err =>{
          this.productservice.loadingdismiss();
          this.productservice.presentToast(err.error.message);
       })
      }
      
    }
    viewcart(){
      this.router.navigate(['/viewcartproduct']);
    }
}
