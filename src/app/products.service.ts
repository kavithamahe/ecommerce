import { Injectable } from '@angular/core';
import { RequestOptions, Response ,Headers } from '@angular/http';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastController,LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  dasda: HttpHeaders;
  token: string;
  private apiUrl = environment.apiUrl;
  headers: any;
  options: any;
  isLoading = false;
  constructor(private http : HttpClient,public toastController: ToastController,public loadingController: LoadingController) {
    this.token=localStorage.getItem("token");
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers= this.headers.append("Authorization", "Bearer " + this.token);
    
   }
   getproductlist(id,subcategory_id,search,searchText): Observable<any> {
    const body= {"category_id":id,"subcategory_id":subcategory_id,"price":search};
    return this.http.post(this.apiUrl + 'getproductlist',body,this.headers);
  }
  getproductlistsearch(search): Observable<any> {
    const body= {"quantity":2};
    return this.http.post(this.apiUrl + 'getproductlistsearch',body,this.headers);
  }
  getCategoryList(): Observable<any> {
    const body= { };
    return this.http.post(this.apiUrl + 'getcategory',body,this.headers);
  }
  getproductlistsingle(id): Observable<any> {
    const body= {"id":id};
    return this.http.post(this.apiUrl + 'viewsingleproduct',body,this.headers);
  }
  getsubcategory(category_id): Observable<any> {
    const body= {"category_id":category_id};
    return this.http.post(this.apiUrl + 'getsubcategory',body,this.headers);
  }
  getsubsubcategory(): Observable<any> {
    const body= {"category_id":"12","subcategory_id":"10"};
    return this.http.post(this.apiUrl + 'getsubsubcategory',body,this.headers);
  }
  userregister(formvalue): Observable<any>{
    return this.http.post(this.apiUrl + 'register',formvalue,this.headers);
  }
  login(formvalue): Observable<any>{
    return this.http.post(this.apiUrl + 'login',formvalue,this.headers);
  }
  onetimepassword(mobile,otp): Observable<any>{
    const body= {"mobile":mobile,"otp":otp,"email":""};
    return this.http.post(this.apiUrl + 'onetimepassword',body,this.headers);
  }
  addaddress(formvalue): Observable<any>{
    return this.http.post(this.apiUrl + 'addaddress',formvalue,this.headers);
  }
  getaddress(user_id): Observable<any> {
    const body= {"user_id":user_id};
    return this.http.post(this.apiUrl + 'getaddress',body,this.headers);
  }
  removeaddress(id): Observable<any> {
    this.token=localStorage.getItem("token");
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers= this.headers.append("Authorization", "Bearer " + this.token);
    const body= {"id":id};
    return this.http.post(this.apiUrl + 'removeaddress',body,{ headers:this.headers });
  }
  checkout(user_id,customer_id,product_id,amount,quantity): Observable<any> {
    const body= {"user_id":user_id,"customer_id":customer_id,"product_id":product_id,"payment_type":"offline",
  "amount":amount,"quantity":quantity};
    return this.http.post(this.apiUrl + 'productcheckout',body,this.headers);
  }
  checkoutcart(user_id,customer_id,productListsfromcart,totalpricecart): Observable<any> {
    this.token=localStorage.getItem("token");
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers= this.headers.append("Authorization", "Bearer " + this.token);
    const body= {"user_id":user_id,"customer_id":customer_id,"productListsfromcart":productListsfromcart,"payment_type":"offline",
  "totalpricecart":totalpricecart};
    return this.http.post(this.apiUrl + 'productcheckoutformcart',body,{ headers:this.headers });
  }
  getallorders(user_id): Observable<any> {
    this.token=localStorage.getItem("token");
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers= this.headers.append("Authorization", "Bearer " + this.token);
    const body= {"user_id":user_id};
    return this.http.post(this.apiUrl + 'getmyorders',body,{ headers:this.headers });
  }
  changepassword(password): Observable<any> {
    this.token=localStorage.getItem("token");
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers= this.headers.append("Authorization", "Bearer " + this.token);
   
    const body= {"current_password":password.currentpassword,"new_password":password.newpassword,"confirm_password":password.confirmpassword};
    return this.http.post(this.apiUrl + 'password/change',body,{ headers:this.headers });
  }
  forgetpassword(email): Observable<any> { 
    const body= {"email":email};
    return this.http.post(this.apiUrl + 'password/forgot',body,this.headers);
  }
  getprofile(user_id): Observable<any> { 
    this.token=localStorage.getItem("token");
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers= this.headers.append("Authorization", "Bearer " + this.token);
    const body= {"user_id":user_id};
    return this.http.post(this.apiUrl + 'getprofile',body,{ headers:this.headers });
  }
  editprofile(user_id,name,email,mobile): Observable<any> { 
    this.token=localStorage.getItem("token");
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers= this.headers.append("Authorization", "Bearer " + this.token);
    
    const body= {"id":user_id,"username":name,"email":email,"mobile":mobile};
    return this.http.post(this.apiUrl + 'editprofile',body,{ headers:this.headers });
  }
  viewsingleaddress(id): Observable<any> { 
    this.token=localStorage.getItem("token");
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers= this.headers.append("Authorization", "Bearer " + this.token);
    const body= {"id":id};
    return this.http.post(this.apiUrl + 'viewsingleaddress',body,{ headers:this.headers });
  }
  editaddress(id,addresss): Observable<any> { 
    this.token=localStorage.getItem("token");
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers= this.headers.append("Authorization", "Bearer " + this.token);
    const body= {"id":id,"address":addresss.address,"landmark":addresss.landmark,"city":addresss.city,"state":addresss.state,"zipcode":addresss.zipcode};
    return this.http.post(this.apiUrl + 'editaddress',body,{ headers:this.headers });
  }
  async presentToast(datamessage) {
    const toast = await this.toastController.create({
      message: datamessage,
      duration: 2000
    });
    toast.present();
  }
  async presentLoading() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'crescent',
      duration: 1000
    });
    return await loading.present();
  }
  async loadingdismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }
}
