import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: "page-edit-challenge",
  templateUrl: "edit-challenge.html"
})
export class EditChallengePage {
  challengeList: Array<Object> = [];

  challengeToBeEdited: any;
  index: number;
  challenge: any;
  editChallengeForm: FormGroup;
  badSubmitAttempt: boolean = false;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public storage: Storage
  ) {
    this.challengeToBeEdited = this.navParams.data.name;
    this.index = this.navParams.data.index;

    this.editChallengeForm = formBuilder.group({
      challenge: [this.challengeToBeEdited.name, Validators.required]
    });

    // Load My Challenge List from storage
    this.storage.get("challengeList").then(data => {
      if (data != null) {
        this.challengeList = data;
      }
    });
  }

  // Upon correct form entry, save the data into an array
  save() {
    if (this.editChallengeForm.valid) {
      this.badSubmitAttempt = false;
      console.log("success");

      // Modify list:
      if (this.index > -1) {
        this.challengeList[this.index] = {
          name: this.editChallengeForm.value.challenge
        };

        // Reset the challenge list in storage
        this.storage.ready().then(() => {
          this.storage.set("challengeList", this.challengeList);
        });
      }

      this.navCtrl.pop();
    } else {
      this.badSubmitAttempt = true;
    }
  }
}
