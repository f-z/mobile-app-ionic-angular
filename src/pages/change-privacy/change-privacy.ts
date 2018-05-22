import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { dbProvider } from "../../providers/database/dbProvider";
import { MorePage } from "../more/more";

/**
 * Generated class for the ChangePrivacyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-change-privacy",
  templateUrl: "change-privacy.html"
})
export class ChangePrivacyPage {
  private username: string;
  private sharingData: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public db: dbProvider
  ) {
    this.username = this.navParams.get("username");
  }

  ionViewDidLoad() {
    this.readSharingData();
    console.log("Loaded Change Privacy Page");
  }

  ionViewWillEnter() {
    console.log("Entered Change Privacy Page");
  }

  readSharingData() {
    // loading current user's sharing data from storage
    this.storage.get("sharingData").then(data => {
      this.sharingData = data;
    });
  }

  updateEntry() {
    this.db.sendNotification(
      `Congratulations, your privacy settings were successfully updated!`
    );

    let body: string = this.username + "&" + this.sharingData;

    this.db.updateEntry(body, "update-privacy.php");

    // storing new sharing data option to storage
    this.storage.ready().then(() => {
      this.storage.set("sharingData", this.sharingData);
    });

    this.navCtrl.push(MorePage);
  }
}
