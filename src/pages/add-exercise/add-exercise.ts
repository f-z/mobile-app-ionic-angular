import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Storage } from "@ionic/storage";
import { dbProvider } from "../../providers/database/dbProvider";

@IonicPage()
@Component({
  selector: "page-add-exercise",
  templateUrl: "add-exercise.html"
})
export class AddExercisePage {
  // List of user's exercises
  private exerciseHistory = [];

  addExerciseForm: FormGroup;
  badSubmitAttempt: boolean = false;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public storage: Storage,
    private db: dbProvider
  ) {
    // Construct the form for the exercise.  Only the type is required.
    this.addExerciseForm = formBuilder.group({
      exerciseType: ["", Validators.required],
      distance: [""],
      time: [""]
    });

    // Get Exercise History from storage
    this.storage.get("exerciseHistory").then(data => {
      if (data != null) {
        this.exerciseHistory = data;
      }
    });
  }

  // Upon correct form entry, save the data into an array
  save() {
    if (this.addExerciseForm.valid) {
      this.badSubmitAttempt = false;

      let currentDate = new Date();
      let dateString = currentDate.toDateString();

      // Add new item to the array:
      this.exerciseHistory.push({
        type: this.addExerciseForm.value.exerciseType,
        distance: this.addExerciseForm.value.distance,
        time: this.addExerciseForm.value.time,
        saveDate: dateString,
        formattedDate: new Date().toLocaleString("en-GB", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        })
      });

      // Add exercise history to storage:
      this.storage.ready().then(() => {
        this.storage.set("exerciseHistory", this.exerciseHistory);
      });

      this.presentAdditionToast();

      this.navCtrl.pop();
    } else {
      this.badSubmitAttempt = true;
    }
  }

  // Toast notification if a challenge is added
  presentAdditionToast() {
    this.db.sendNotification("New exercise added!");
  }
}
