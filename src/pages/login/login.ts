import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { Facebook, NativeStorage,GooglePlus } from 'ionic-native';


/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  FB_APP_ID: number = 521038804950406;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController) {
        Facebook.browserInit(this.FB_APP_ID, "v2.8");

        

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doFbLogin(){
    console.log("Hello");
    let permissions = new Array();
    let nav = this.navCtrl;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];

      console.log(JSON.stringify(permissions));

    Facebook.login(permissions)
    .then(function(response){
      console.log(JSON.stringify(response));
      let userId = response.authResponse.userID;
      let params = new Array();

      //Getting name and gender properties
      Facebook.api("/me?fields=name,gender", params)
      .then(function(user) {
      

        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
        NativeStorage.setItem('user',
        {
          name: user.name,
          gender: user.gender,
          picture: user.picture
        })
        .then(function(){
          console.log("HOMEPAGE");
          nav.push(HomePage);
        }, function (error) {
          console.log(JSON.stringify(error));
        })
      })
    }, function(error){
      console.log(JSON.stringify(error));
    });
  }

  doGoogleLogin(){
  let nav = this.navCtrl;
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  loading.present();
  GooglePlus.login({
    'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
    'webClientId': '598533771222-3crv56u1h210e60e3vpnussn7p3o02j8.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
    
    'offline': true
  })
  .then(function (user) {
    loading.dismiss();

    NativeStorage.setItem('user', {
      name: user.displayName,
      email: user.email,
      picture: user.imageUrl
    })
    .then(function(){
      nav.push(HomePage);
    }, function (error) {
      console.log('Algo paso');
      console.log(JSON.stringify(error));
    })
  }, function (error) {
    console.log(JSON.stringify(error));
    loading.dismiss();
  });
}

}
