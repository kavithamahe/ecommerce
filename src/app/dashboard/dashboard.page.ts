import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router,ActivatedRoute, NavigationEnd, } from '@angular/router';
import { ProductsService } from 'src/app/products.service';
import { environment } from '../../environments/environment';
import { Events } from '@ionic/angular';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit  {
  cartDetails: any;
  cartcount: any;
  private imageUrl = environment.imageUrl;
  getProductLists:any=[];
  getallcategories:any=[];
  sliderConfig = {
    slidesPerView: 3,
    spaceBetween: 6,
    autoplay:true,
    loop:true
  };
  sliderConfigimage = {
    spaceBetween: 6,
    autoplay:true
  }
  imgURl:any;
  term = { searchText: '',};
  constructor(public productservice:ProductsService,public router: Router,public events: Events) { 
    this.events.subscribe('cart', ()=>{
      this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
      if(this.cartDetails){
        this.cartcount = this.cartDetails.length;
        console.log(this.cartcount)
      }
    })

    this.getproductList();
    this.getCategory();
    this.getsubsubcategory();
  }

  ngOnInit() {
   this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.getproductList();
        console.log("DashboardContainerComponent.onNavigationEnd()");
      }
    });
  
    this.imgURl = this.imageUrl;
    this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
    if(this.cartDetails){
      this.cartcount = this.cartDetails.length;
    }
    
    
  }
  ionViewWillEnter(){
    this.events.subscribe('cart', ()=>{
      this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
      if(this.cartDetails){
        this.cartcount = this.cartDetails.length;
      }
    })
    this.getproductList();
    this.getCategory();
  }
  getproductList(){
    this.productservice.presentLoading();
    this.productservice.getproductlist('','','',this.term.searchText)
    .subscribe(product =>{ 
      this.getProductLists = product.data;
      this.productservice.loadingdismiss();
    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message);
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
  getsubsubcategory(){
    this.productservice.presentLoading();
    this.productservice.getsubsubcategory()
    .subscribe(category =>{ 
    },
    err =>{
      this.productservice.loadingdismiss();
      this.productservice.presentToast(err.error.message);
   })
  }
  filterbyCategory(id){
    this.router.navigate(['/productbycategory',{"id":id}],{skipLocationChange: true});
  }

  doRefresh(event){
    this.getproductList();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  // getItems(searchItem) {
  //   this.productservice.getproductlistsearch(this.term.searchText)
  //   .subscribe(product =>{ 
  //     this.getProductLists = product.data;
  //   },
  //   err =>{
  //     this.productservice.presentToast(err.error.message);
  //  })
  // }
  getItems(ev) {
    // Reset items back to all of the items
    this.getproductList();
    console.log(this.getProductLists);
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.getProductLists = this.getProductLists.filter((item) => {
        return (item.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  viewsingleproduct(id){
    this.router.navigate(['/viewsingleproduct',{"id":id}]);
  }
  viewcart(){
    this.router.navigate(['/viewcartproduct']);
  }
}
