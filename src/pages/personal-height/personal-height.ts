import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Http } from "@angular/http";
import { MorePage } from "../more/more";
import { Storage } from "@ionic/storage";
import { dbProvider } from "../../providers/database/dbProvider";

/**
 * Generated class for the PersonalHeightPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-personal-height",
  templateUrl: "personal-height.html"
})
export class PersonalHeightPage {
  addHeightForm: FormGroup;
  private username: string;
  private height: number;

  // initialising module classes
  constructor(
    public http: Http,
    public navCtrl: NavController,
    public fb: FormBuilder,
    public navParams: NavParams,
    private storage: Storage,
    private db: dbProvider
  ) {
    // creating form builder validation rules
    this.addHeightForm = fb.group({
      height: ["", Validators.required]
    });
    this.username = "test";
  }

  ionViewDidLoad() {
    this.readHeightData();
    console.log("Loaded Personal Height Page.");
  }

  readHeightData() {
    // loading current user's height data from storage
    this.storage.get("height").then(data => {
      this.height = data;
    });
  }

  updateEntry() {
    this.db.sendNotification(
      `Congratulations, your height was successfully updated!`
    );

    let height: string = this.addHeightForm.controls["height"].value;

    let body: string = this.username + "&" + height;

    this.db.updateEntry(body, "update-height.php");

    this.storage.ready().then(() => {
      this.storage.set("height", height);
    });

    this.navCtrl.push(MorePage);
  }
}
