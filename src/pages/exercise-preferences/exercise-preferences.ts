import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
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
  selector: "page-exercise-preferences",
  templateUrl: "exercise-preferences.html"
})
export class ExercisePreferencesPage {
  private username: string;
  private exercisePreferences: any = [];
  private running: boolean = false;
  private yoga: boolean = false;
  private pilates: boolean = false;
  private cycling: boolean = false;
  private weights: boolean = false;

  // Initialise module classes
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: dbProvider
  ) {
    this.username = this.navParams.get("username");
    this.exercisePreferences = this.navParams.get("exercisePreferences");

    // mapping preferences to checkboxes
    if (this.exercisePreferences.includes("Running")) {
      this.running = true;
    }
    if (this.exercisePreferences.includes("Yoga")) {
      this.yoga = true;
    }
    if (this.exercisePreferences.includes("Pilates")) {
      this.pilates = true;
    }
    if (this.exercisePreferences.includes("Cycling")) {
      this.cycling = true;
    }
    if (this.exercisePreferences.includes("Weights")) {
      this.weights = true;
    }
  }

  updateEntry() {
    this.db.sendNotification(
      `Congratulations, your exercise preferences were successfully updated!`
    );

    let body: string =
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

    this.db.updateEntry(body, "update-exercise-preferences.php");

    this.navCtrl.push(MorePage);
  }
}
