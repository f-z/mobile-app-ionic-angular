import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Http } from "@angular/http";
import { Storage } from "@ionic/storage";
import { dbProvider } from "../../providers/database/dbProvider";
import { MorePage } from "../more/more";

/**
 * Generated class for the PersonalWeightPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-personal-weight",
  templateUrl: "personal-weight.html"
})
export class PersonalWeightPage {
  addWeightForm: FormGroup;
  private username: string;
  private weight: number;

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
    this.addWeightForm = fb.group({
      weight: ["", Validators.required]
    });
    this.username = "test";
  }

  ionViewDidLoad() {
    this.readWeightData();
    console.log("Loaded Personal Weight Page.");
  }

  readWeightData() {
    // loading current user's weight data from storage
    this.storage.get("weight").then(data => {
      this.weight = data;
    });
  }

  updateEntry() {
    this.db.sendNotification(
      `Congratulations, your weight was successfully updated!`
    );

    let weight: string = this.addWeightForm.controls["weight"].value;

    let body: string = this.username + "&" + weight;

    this.db.updateEntry(body, "update-weight.php");

    this.storage.ready().then(() => {
      this.storage.set("weight", weight);
    });

    this.navCtrl.push(MorePage);
  }
}
