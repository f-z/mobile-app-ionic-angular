import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ExercisePrefSetupPage } from "../exercise-pref-setup/exercise-pref-setup";

/**
 * Generated class for the HeightWeightSetupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-height-weight-setup",
  templateUrl: "height-weight-setup.html"
})
export class HeightWeightSetupPage {
  addHeightWeightForm: FormGroup;
  private username: string;
  private password: string;
  private email: string;
  private ageGroup: string;

  constructor(
    public navCtrl: NavController,
    public fb: FormBuilder,
    public navParams: NavParams
  ) {
    // creating form builder validation rules
    this.addHeightWeightForm = fb.group({
      height: ["", Validators.required],
      weight: ["", Validators.required]
    });

    this.username = this.navParams.get("username");
    this.password = this.navParams.get("password");
    this.email = this.navParams.get("email");
    this.ageGroup = this.navParams.get("ageGroup");
  }

  next() {
    this.navCtrl.push(ExercisePrefSetupPage, {
      username: this.username,
      password: this.password,
      email: this.email,
      ageGroup: this.ageGroup,
      height: this.addHeightWeightForm.controls["height"].value,
      weight: this.addHeightWeightForm.controls["weight"].value
    });
  }
}
