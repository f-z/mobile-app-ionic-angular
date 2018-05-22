import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { ChangePasswordPage } from "../change-password/change-password";
import { ChangePrivacyPage } from "../change-privacy/change-privacy";

/**
 * Generated class for the AppSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-app-settings",
  templateUrl: "app-settings.html"
})
export class AppSettingsPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  goToPasswordPage() {
    this.navCtrl.push(ChangePasswordPage, {
      username: this.navParams.get("username")
    });
  }

  goToPrivacyPage() {
    this.navCtrl.push(ChangePrivacyPage, {
      username: this.navParams.get("username")
    });
  }

  ionViewWillEnter() {
    console.log("Entered App Settings Page");
  }
}
