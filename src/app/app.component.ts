import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {NativeStorage,GooglePlus} from 'ionic-native'
import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      splashScreen.hide();
      statusBar.styleDefault();
        
      
    });
  }
   ngAfterViewInit(){
      //this.nav is now defined
      setTimeout(() => {
      let env = this;

      GooglePlus.trySilentLogin({
        'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
        'webClientId': '598533771222-3crv56u1h210e60e3vpnussn7p3o02j8.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
        'offline': true
      })



      NativeStorage.getItem('user')
      .then( function (data) {
        // user is previously logged and we have his data
        // we will let him access the app
        env.nav.push(HomePage);
      }, function (error) {
        //we don't have the user data so we will ask him to log in
        env.nav.push(LoginPage);
      });
      }, 2000);
    }
}
