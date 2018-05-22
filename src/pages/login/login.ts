import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController
} from "ionic-angular";
import { ProfileSetupPage } from "../profile-setup/profile-setup";
import { Storage } from "@ionic/storage";
import { dbProvider } from "../../providers/database/dbProvider";
import { TabsPage } from "../tabs/tabs";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  private users: any = null;
  private username: string;
  private password: string;
  private sharingData: boolean;
  private height: number;
  private weight: number;

  constructor(
    public navCtrl: NavController,
    public db: dbProvider,
    public storage: Storage,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ionViewDidEnter() {
    this.hideTabs();

    this.retrieveUserInfo();
  }

  retrieveUserInfo() {
    // if current user is not set, so this is the first time someone logs in to the app
    this.storage.get("currentUser").then(data => {
      if (data === null) {
        let loader = this.loadingCtrl.create({
          content: "Welcome!"
        });
        loader.present();

        this.db.getUsers().then(theResult => {
          this.users = theResult;
          loader.dismiss();
        });
      } else {
        // loading current user from storage and going straight to the tabs page
        this.username = data;
        this.navCtrl.setRoot(TabsPage);
      }
    });
  }

  login() {
    if (this.checkCredentials(this.username, this.password)) {
      // save current user to storage
      this.storage.ready().then(() => {
        this.storage.set("currentUser", this.username);
        this.storage.set("sharingData", this.sharingData);
        this.storage.set("height", this.height);
        this.storage.set("weight", this.weight);
      });

      this.navCtrl.setRoot(TabsPage);
    } else {
      this.showError("Wrong username/password!");
    }
  }

  checkCredentials(username: string, password: string) {
    let access: boolean = false;

    // checking the supplied credentials
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].username == username) {
        access = this.users[i].password == password;
        this.sharingData = this.users[i].sharingData;
        this.height = this.users[i].height;
        this.weight = this.users[i].weight;
        break;
      }
    }

    return access;
  }

  showError(text) {
    let alert = this.alertCtrl.create({
      title: "Error",
      subTitle: text,
      buttons: ["OK"]
    });
    alert.present();
  }

  register() {
    this.navCtrl.push(ProfileSetupPage, { users: this.users });
  }

  hideTabs() {
    let tabs = document.querySelectorAll(".tabbar");
    if (tabs !== null) {
      Object.keys(tabs).map(key => {
        tabs[key].style.transform = "translateY(56px)";
      });
    }
  }
}
