import { Component } from '@angular/core';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AlertController,NavController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  employee = { mobileotp: '',};
  verificationId: any;
  constructor(public firebaseAuthentication:FirebaseAuthentication,private alertCtrl: AlertController,public navCtrl:NavController) {
    firebaseAuthentication.onAuthStateChanged().subscribe((user) => {
      if(user){
        navCtrl.navigateRoot(['/dashboard']);
      }
      else{
        navCtrl.navigateRoot(['']);
      }
    })
    
  }
  otpsend(mobile_otp){
    const phoneNumberString = "+" + mobile_otp;

    this.firebaseAuthentication.verifyPhoneNumber(phoneNumberString, 30000)
    .then( confirmationResult => {
      this.verificationId = confirmationResult;
      this.alert(this.verificationId);
      
    })
  .catch((error) => {
    this.alert(error);
    console.error(error)});

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
          this.firebaseAuthentication.signInWithVerificationId(verificationId,data).then((user) => {
          console.log(user);
            
          })
          }
        }
      ]
    });
    await prompt.present();
  }
}
