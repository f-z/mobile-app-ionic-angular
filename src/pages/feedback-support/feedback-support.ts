import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import "rxjs/add/operator/map";
import { dbProvider } from "../../providers/database/dbProvider";
import { MorePage } from "../more/more";

/**
 * Generated class for the ExercisePreferencesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-feedback-support",
  templateUrl: "feedback-support.html"
})
export class FeedbackSupportPage {
  private sendMessageForm: FormGroup;
  private username: string;
  private selected: string;
  private message: string;

  // Initialise module classes
  constructor(
    public navCtrl: NavController,
    public fb: FormBuilder,
    public navParams: NavParams,
    private db: dbProvider
  ) {
    // Create form builder validation rules
    this.sendMessageForm = fb.group({
      message: ["", Validators.required]
    });
    this.username = this.navParams.get("username");
    this.selected = "";
  }

  ionViewWillEnter() {}

  updateEntry() {
    this.db.sendNotification(
      `Congratulations, your message was successfully sent!`
    );
    let body: string = this.username + "&" + this.selected + "&" + this.message;

    this.db.updateEntry(body, "contact.php");

    this.navCtrl.push(MorePage);
  }
}
