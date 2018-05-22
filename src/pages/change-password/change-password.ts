import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { dbProvider } from "../../providers/database/dbProvider";
import { MorePage } from "../more/more";

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-change-password",
  templateUrl: "change-password.html"
})
export class ChangePasswordPage {
  private changePasswordForm: FormGroup;
  private username: string;

  // initialise module classes
  constructor(
    public navCtrl: NavController,
    public fb: FormBuilder,
    public navParams: NavParams,
    private db: dbProvider,
    public toastCtrl: ToastController
  ) {
    // create form builder validation rules
    this.changePasswordForm = fb.group({
      password: ["", Validators.required]
    });
    this.username = this.navParams.get("username");
  }

  updateEntry() {
    this.db.sendNotification(
      `Congratulations, your password was successfully updated!`
    );

    let password: string = this.changePasswordForm.controls["password"].value;

    let body: string = this.username + "&" + password;

    this.db.updateEntry(body, "update-password.php");

    this.navCtrl.push(MorePage);
  }
}
