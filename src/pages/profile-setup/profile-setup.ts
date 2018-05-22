// This file profile-setup.ts is adapted from https://stackoverflow.com/a/46181/5181904.

import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";

/**
 * Generated class for the ProfileSetupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-profile-setup",
  templateUrl: "profile-setup.html"
})
export class ProfileSetupPage {
  private users: any = null;
  private username: string;
  private usernameExists: boolean;
  private password: string;
  private email: string;
  private ageGroup: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController
  ) {
    this.username = "";
    this.password = "";
    this.email = "";
    this.usernameExists = false;
    this.users = this.navParams.get("users");
  }

  ionViewDidLoad() {
    console.log("Loaded Profile Setup Page");
  }

  next() {
    // checking the supplied credentials
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].username == this.username) {
        this.usernameExists = true;
        break;
      }
    }

    if (this.usernameExists) {
      this.showError("Username already exists!");
      this.username = "";
      this.usernameExists = false;
    }
    else if (!this.validateEmail(this.email)) {
      this.showError("Please enter a valid email!");
    }
    else if (this.username == "" || this.password == "" || this.email == "") {
      this.showError("Please fill in the required fields!");
    }
    else {
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  showError(text) {
    let alert = this.alertCtrl.create({
      title: "Error",
      subTitle: text,
      buttons: ["OK"]
    });
    alert.present();
  }
}
