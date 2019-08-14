import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  submitAttempt: boolean = false;
  verificationId: any;
  constructor(public firebaseAuthentication:FirebaseAuthentication,private alertCtrl: AlertController,private router: Router,public formBuilder: FormBuilder,public productservice:ProductsService) { 

  }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      gender: ['', Validators.compose([Validators.required])],
      mobile: ['', Validators.compose([Validators.required])],
      addressline1: ['', Validators.compose([Validators.required])],
      addressline2: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      zipcode: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
     
       });
  }
  submit(){
    let mobileapp = {"mobileapp":""};
    let obj = Object.assign(this.registerForm.value,mobileapp);
    if(!this.registerForm.valid){
      this.submitAttempt = true;
    }else{
      this.productservice.presentLoading();
      this.submitAttempt = false;
      this.productservice.userregister(obj).subscribe(data =>{
        this.productservice.loadingdismiss();
        const phoneNumberString = "+91" + this.registerForm.value.mobile;

        this.firebaseAuthentication.verifyPhoneNumber(phoneNumberString, 30000)
        .then( confirmationResult => {
          this.verificationId = confirmationResult;
          console.log(this.verificationId)
          this.alert(this.verificationId);
          
        })
      .catch((error) => {
        this.alert(error);
        console.error(error)});
       
      }, 
       err =>{
        this.productservice.loadingdismiss();
        this.productservice.presentToast(err.error.message);
     })
    }
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
            this.productservice.onetimepassword(this.registerForm.value.mobile,otp).subscribe(otpdata =>{
              console.log(otpdata);
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
}
