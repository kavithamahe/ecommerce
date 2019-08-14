import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from '../products.service';
import { ToastController, AlertController } from '@ionic/angular';
import { Events } from '@ionic/angular';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  cartcount: any;
  cartDetails: any;
  fromcart: string;
  quantity: string;
  loginForm: FormGroup;
  submitAttempt: boolean = false;
  employee = { mobileotp: ''};
  verificationId: any;
  singleid:any;
  numberverify:boolean = false;
  verify = { mobile: ''};

  constructor(public firebaseAuthentication:FirebaseAuthentication,public events: Events,private route: ActivatedRoute,private alertCtrl: AlertController,private router: Router,public formBuilder: FormBuilder,public productservice:ProductsService,public toastController: ToastController) { 
    this.singleid = route.snapshot.paramMap.get('id');
    this.quantity = route.snapshot.paramMap.get('quantity');
    this.fromcart = route.snapshot.paramMap.get('fromcart');
    this.events.subscribe('cart', ()=>{
      this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
      if(this.cartDetails){
        this.cartcount = this.cartDetails.length;
      }
    })
    // firebaseAuthentication.onAuthStateChanged().subscribe((user) => {
    //   if(user){
    //     router.navigate(['/dashboard']);
    //   }
    //   else{
    //     router.navigate(['']);
    //   }
    // })

  }
  ionViewWillEnter(){
    this.events.subscribe('cart', ()=>{
      this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
      if(this.cartDetails){
        this.cartcount = this.cartDetails.length;
      }
    })
  }
  ngOnInit() {
    this.cartDetails = (JSON.parse(localStorage.getItem('cart_items')));
    if(this.cartDetails){
      this.cartcount = this.cartDetails.length;
    }
    this.initForm();
  }
  initForm(){
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
      });
  }
  
  register(){
    this.router.navigate(['register']);
  }
  login(){
    if(!this.loginForm.valid){
      this.submitAttempt = true;
    }else{
      this.submitAttempt = false;
      this.productservice.login(this.loginForm.value).subscribe(data =>{
        localStorage.setItem("token", data['refreshToken']);
        let token = localStorage.setItem("token", data['refreshToken']);
        localStorage.setItem("user_id", data['userid']);
        this.events.publish('loggedin');
        this.router.navigate(['proceedcheckout',{"id":this.singleid,"quantity":this.quantity,"fromcart":this.fromcart}]);
      },
      err =>{
        if(err.status == 401){
          this.numberverify = true;
          this.presentToast(err.error.message);
        }
        else{
          this.presentToast(err.error.message);
        }
        
            })
    }
  }
  verifynumber(mobilenumber){
      this.productservice.presentLoading();
        this.productservice.loadingdismiss();
        const phoneNumberString = "+91" + mobilenumber;

        this.firebaseAuthentication.verifyPhoneNumber(phoneNumberString, 30000)
        .then( confirmationResult => {
          this.verificationId = confirmationResult;
          this.alert(this.verificationId);
          
        })
      .catch((error) => {
        this.alert(error);
        console.error(error)
      });
  }
  async alert(verificationId){
    const prompt = await this.alertCtrl.create({
      header: 'Enter the Confirmation code',
      inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
      buttons: [
        { text: 'Cancel',
          handler: data => { console.log('Cancel clicked'); }
        },
        { text: 'Send',
          handler: data => {
            let otp = "1";
          this.firebaseAuthentication.signInWithVerificationId(verificationId,data.confirmationCode).then((user) => {
            this.productservice.onetimepassword(this.verify.mobile,otp).subscribe(otpdata =>{
              console.log(otpdata);
              this.numberverify = false;
            },
            err =>{
              this.productservice.presentToast(err.error.message);
           })
          console.log(user);
          this.router.navigate(['checkout']);
          })
          }
        }
      ]
    });
    await prompt.present();
  }
  forgetpassword(){
    this.router.navigate(['forgetpassword',{"id":this.singleid,"quantity":this.quantity,"fromcart":this.fromcart}]);
  }
  async presentToast(datamessage) {
    const toast = await this.toastController.create({
      message: datamessage,
      duration: 2000
    });
    toast.present();
  }
  viewcart(){
    this.router.navigate(['/viewcartproduct']);
  }
}
