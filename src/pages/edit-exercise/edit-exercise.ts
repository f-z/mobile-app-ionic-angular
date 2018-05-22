import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { Validators, FormBuilder, FormGroup } from "@angular/forms";

import { Storage } from "@ionic/storage";
import { dbProvider } from "../../providers/database/dbProvider";

@IonicPage()
@Component({
  selector: "page-edit-exercise",
  templateUrl: "edit-exercise.html"
})
export class EditExercisePage {
  editExerciseForm: FormGroup;
  badSubmitAttempt: boolean = false;
  private editType = "Exercise type";
  private editDistance = 0;
  private editTime = 0;
  index = -1;
  exerciseHistory: any = [];

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    private storage: Storage,
    private db: dbProvider
  ) {
    this.index = this.navParams.get("index");
    this.exerciseHistory = this.navParams.get("history");
    // Fill in the form with the information of the exercise
    this.editType = this.exerciseHistory[this.index].type;
    this.editDistance = this.exerciseHistory[this.index].distance;
    this.editTime = this.exerciseHistory[this.index].time;

    this.editExerciseForm = formBuilder.group({
      exerciseType: [this.editType, Validators.required],
      distance: [this.editDistance],
      time: [this.editTime]
    });
  }

  // upon correct form entry, storing the data into an array
  save() {
    if (this.editExerciseForm.valid) {
      this.badSubmitAttempt = false;
      this.exerciseHistory[this.index] = {
        type: this.editExerciseForm.value.exerciseType,
        distance: this.editExerciseForm.value.distance,
        time: this.editExerciseForm.value.time,
        saveDate: this.exerciseHistory[this.index].saveDate,
        formattedDate: this.exerciseHistory[this.index].formattedDate
      };
      
      this.db.sendNotification("Exercise updated!");

      // updating exercise history to local storage
      this.storage.ready().then(() => {
        this.storage.set("exerciseHistory", this.exerciseHistory);
      });

      this.navCtrl.pop(); 
    } else {
      this.badSubmitAttempt = true;
    }
  }
}
