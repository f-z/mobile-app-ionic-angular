import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { PersonalHeightPage } from "../personal-height/personal-height";
import { PersonalWeightPage } from "../personal-weight/personal-weight";
import { ExercisePreferencesPage } from "../exercise-preferences/exercise-preferences";

import { Storage } from "@ionic/storage";
import { dbProvider } from "../../providers/database/dbProvider";

/**
 * Generated class for the PersonalDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-personal-data",
  templateUrl: "personal-data.html"
})
export class PersonalDataPage {
  private exercises: any = null;
  private exercisePreferences: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private db: dbProvider
  ) {
    // if current exercise preferences are not set, so this is the first time someone logs in to the app
    this.storage.get("exercises").then(data => {
      if (data === null) {
        this.db.getExercisePreferences().then(theResult => {
          this.exercises = theResult;
        });
      } else {
        // loading current exercise preferences from storage
        this.exercises = data;
      }
    });
  }

  goToExercisePrefPage() {
    // finding the exercise preferences associated with the current username
    for (var i = 0; i < this.exercises.length; i++) {
      if (this.exercises[i].username == this.navParams.get("username")) {
        this.exercisePreferences.push(this.exercises[i].type);
      }
    }
    this.navCtrl.push(ExercisePreferencesPage, {
      username: this.navParams.get("username"),
      exercisePreferences: this.exercisePreferences
    });
  }

  goToHeightPage() {
    this.navCtrl.push(PersonalHeightPage, {
      username: this.navParams.get("username")
    });
  }

  goToWeightPage() {
    this.navCtrl.push(PersonalWeightPage, {
      username: this.navParams.get("username")
    });
  }

  ionViewDidLoad() {
    console.log("Loaded Personal Data Page.");
  }
}
