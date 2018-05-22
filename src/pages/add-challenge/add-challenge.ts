import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { dbProvider } from "../../providers/database/dbProvider";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@IonicPage()
@Component({
  selector: "page-add-challenge",
  templateUrl: "add-challenge.html"
})
export class AddChallengePage {
  ownChallenge: any;
  challenge: any;
  challengeList: Array<Object> = [];

  ownChallengeForm: FormGroup;
  challengeForm: FormGroup;
  challengeSelected: any = null;
  badSubmitAttempt: boolean = false;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public storage: Storage,
    private db: dbProvider
  ) {
    // Load My Challenge List from storage
    this.storage.get("challengeList").then(data => {
      if (data != null) {
        this.challengeList = data;
      }
    });

    // Get challenges from the database provider
    this.db.getChallenges().then(theResult => {
      this.challengeList = theResult;
    });

    // Build the form for the user's personal challenges
    this.ownChallengeForm = formBuilder.group({
      ownChallenge: ["", Validators.required]
    });

    // Build the form for OCA's challenges
    this.challengeForm = formBuilder.group({
      challenge: [""]
    });
  }

  // User selects a challenge, target this challenge:
  select(challenge) {
    this.challengeSelected = challenge;
  }

  // If the user has made a selection, this will push the information to the storage and return the user to the previous page
  logOwnChallengeForm(form) {
    if (this.ownChallengeForm.valid) {
      this.badSubmitAttempt = false;

      let currentDate = new Date();
      let dateString = currentDate.toDateString();

      // Add challenge to challenges array:
      this.challengeList.push({
        name: this.ownChallengeForm.value.ownChallenge,
        saveDate: dateString
      });
      // Add challenge to storage:
      this.storage.ready().then(() => {
        this.storage.set("challengeList", this.challengeList);
      });

      this.presentAdditionToast();

      this.navCtrl.pop();
    } else {
      this.badSubmitAttempt = true;
    }
  }

  // If the user has made a selection, this will push the data to storage and return the user to the previous page
  logChallengeForm(challenge) {
    if (this.challengeSelected != null) {
      let currentDate = new Date();
      let dateString = currentDate.toDateString();

      // Add challenge to challenges array:
      this.challengeList.push({
        name: this.challengeForm.value.challenge.name,
        saveDate: dateString
      });
      // Add challenge to storage:
      this.storage.ready().then(() => {
        this.storage.set("challengeList", this.challengeList);
      });

      this.presentAdditionToast();

      this.navCtrl.pop();
    } else {
      this.db.sendNotification("Please select a challenge from the list!");
    }
  }

  // Toast notification if a challenge is added
  presentAdditionToast() {
    this.db.sendNotification("New challenge added!");
  }
}
