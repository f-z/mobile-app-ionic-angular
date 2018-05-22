import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { dbProvider } from "../../providers/database/dbProvider";
import { LoginPage } from "../login/login";

/**
 * Generated class for the PrivacySetupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-privacy-setup",
  templateUrl: "privacy-setup.html"
})
export class PrivacySetupPage {
  private username: string;
  private password: string;
  private email: string;
  private ageGroup: string;
  private height: number;
  private weight: number;
  private running: boolean;
  private yoga: boolean;
  private pilates: boolean;
  private cycling: boolean;
  private weights: boolean;
  private sharing: boolean;
  private agree: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: dbProvider,
    private alertCtrl: AlertController
  ) {
    this.username = this.navParams.get("username");
    this.password = this.navParams.get("password");
    this.email = this.navParams.get("email");
    this.ageGroup = this.navParams.get("ageGroup");
    this.height = this.navParams.get("height");
    this.weight = this.navParams.get("weight");
    this.running = this.navParams.get("running");
    this.yoga = this.navParams.get("yoga");
    this.pilates = this.navParams.get("pilates");
    this.cycling = this.navParams.get("cycling");
    this.weights = this.navParams.get("weights");
  }

  goToHomePage() {
    if (this.agree) {
      // inserting new user information into user database table
      let body: string =
        this.username +
        "&" +
        this.email +
        "&" +
        this.password +
        "&" +
        this.ageGroup +
        "&" +
        this.height +
        "&" +
        this.weight +
        "&" +
        this.sharing;

      this.db.updateEntry(body, "setup-profile.php");

      // inserting new user's exercise preferences into preference database table
      let prefBody: string =
        this.username +
        "&" +
        this.running +
        "&" +
        this.yoga +
        "&" +
        this.pilates +
        "&" +
        this.cycling +
        "&" +
        this.weights;

      this.db.updateEntry(prefBody, "update-exercise-preferences.php");

      this.db.getUsers();

      this.navCtrl.push(LoginPage);
    } else {
      this.showError(
        "You need to accept the terms and conditions to use the application!"
      );
    }
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
