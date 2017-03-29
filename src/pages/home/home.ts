import { LoginPage } from './../login/login';
import {Facebook, NativeStorage, GooglePlus } from 'ionic-native';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: any={
    name:'',
    gender:'',
    picture:'',
    img:'https://pbs.twimg.com/profile_images/819914509318062082/a9ilKPGu.jpg'
  };
  userReady: boolean = false;

  constructor(public navCtrl: NavController) {
    
  }

  ionViewCanEnter(){
    let env = this;
    NativeStorage.getItem('user')
    .then(function (data){
      env.user = {
        name: data.name,
        gender: data.gender,
        picture: data.picture,
        img: data.img
      };
        env.userReady = true;
    }, function(error){
      console.log(error);
    });
  }

   doFbLogout(){
    var nav = this.navCtrl;
    Facebook.logout()
    .then(function(response) {
      //user logged out so we will remove him from the NativeStorage
      NativeStorage.remove('user');
      nav.push(LoginPage);
    }, function(error){
      console.log(error);
    });
  }
  
  doGoogleLogout(){
  let nav = this.navCtrl;
  GooglePlus.logout()
  .then(function (response) {
    NativeStorage.remove('user');
    nav.push(LoginPage);
  },function (error) {
    console.log(error);
  })
}

}
