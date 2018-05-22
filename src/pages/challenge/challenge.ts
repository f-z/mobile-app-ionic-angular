import { Component, ViewChild } from "@angular/core";
import { NavController, reorderArray, ItemSliding } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { dbProvider } from "../../providers/database/dbProvider";

import { AddVideoPage } from "../add-video/add-video";
import { AddExercisePage } from "../add-exercise/add-exercise";
import { EditChallengePage } from "../edit-challenge/edit-challenge";
import { AddChallengePage } from "../add-challenge/add-challenge";

@Component({
  selector: "page-challenge",
  templateUrl: "challenge.html"
})
export class ChallengePage {
  @ViewChild("fab") fab; // Pulls the FAB from the HTML so that it can be used here

  // Add and complete challenges:
  currentChallengeTab;
  public challengeList: Array<Object> = []; // List of challenges
  public completedChallengeList: Array<Object> = []; // List of completed challenges
  reorderIsEnabled = false; // For reordering the list

  searchQuery: string = "";

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private db: dbProvider
  ) {
    this.currentChallengeTab = "Challenges";

    // Load list of Challenges
    this.db.getChallenges().then(theResult => {
      this.challengeList = theResult;
    });
  }

  ionViewWillEnter() {
    // Load My Challenge List from storage
    this.storage.get("challengeList").then(data => {
      if (data != null) {
        this.challengeList = data;
      }
    });

    // Load My Completed Challenge List from storage
    this.storage.get("completedChallengeList").then(data => {
      if (data != null) {
        this.completedChallengeList = data;
      }
    });
  }

  ionViewWillLeave() {
    this.fab.close();
  }

  // Get an challenge based on search criteria:
  getChallenges(event) {
    // Reset items back to all of the items
    this.db.getChallenges().then(theResult => {
      this.challengeList = theResult;
    });

    // Set queryString to the value of the searchbar
    let queryString = event.target.value;

    if (queryString !== undefined) {
      // if the value is an empty string don't filter the ItemSliding
      if (queryString.trim() == "") {
        return;
      }

      this.db.getFilteredChallenges(queryString).then(theResult => {
        this.challengeList = theResult;
      });
    }
  }

  // Reset list of  challenges
  resetList(event) {
    // Reset items back to all of the items
    this.db.getChallenges().then(theResult => {
      this.challengeList = theResult;
    });
  }

  // Push to a detail page for each Challenge
  goChallengeDetails(challengeData) {
    this.navCtrl.push("challengeDetailsPage", {
      challengeData: challengeData
    });
  }

  // Jump to form page that allows user to edit existing challenge data
  goToEditChallenge(slidingItem: ItemSliding, challenge: any) {
    let index = this.challengeList.indexOf(challenge);
    this.navCtrl.push(EditChallengePage, { name: challenge, index: index });
    slidingItem.close();
  }

  deleteEntry(slidingItem: ItemSliding, challenge: any) {
    // Get the index of the challenge to be deleted
    let index = this.challengeList.indexOf(challenge);
    if (index > -1) {
      this.challengeList.splice(index, 1);
    }
    // Reset the challenge list in storage
    this.storage.ready().then(() => {
      this.storage.set("challengeList", this.challengeList);
    });

    slidingItem.close();
    this.presentDeletionToast();
  }

  deleteCompletedEntry(slidingItem: ItemSliding, challenge: any) {
    // Get the index of the challenge to be deleted
    let index = this.completedChallengeList.indexOf(challenge);
    if (index > -1) {
      this.completedChallengeList.splice(index, 1);
    }

    // Reset the completed challenge list in storage
    this.storage.ready().then(() => {
      this.storage.set("completedChallengeList", this.completedChallengeList);
    });

    slidingItem.close();

    this.presentDeletionToast();
  }

  // Toast notification if a challenge is deleted
  presentDeletionToast() {
    this.db.sendNotification("Challenge deleted!");
  }

  // Toast notification if a challenge is completed
  presentCompletionToast() {
    this.db.sendNotification("Challenge completed!");
  }

  // Move a challenge from the challenge list to the completed challenge list
  completeEntry(slidingItem: ItemSliding, challenge: any) {
    // Move challenge to the new list
    challenge.saveDate = new Date().toDateString();
    let completedChallengeIndex = this.challengeList.indexOf(challenge);
    this.completedChallengeList.push(challenge);
    this.challengeList.splice(completedChallengeIndex, 1);
    // Save to storage
    this.storage.ready().then(() => {
      this.storage.set("challengeList", this.challengeList);
      this.storage.set("completedChallengeList", this.completedChallengeList);
    });

    this.presentCompletionToast();
    slidingItem.close();
  }

  // When the user clicks `Edit list`, this switches for aesthetic purposes
  toggleReorder() {
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  // Saves reordered challenges in the database
  itemReordered($event) {
    reorderArray(this.challengeList, $event);
    this.storage.ready().then(() => {
      this.storage.set("challengeList", this.challengeList);
    });
  }

  // FAB Navigation
  // Jump to form page that allows user to add new exercise data
  goToAddVideo() {
    this.navCtrl.push(AddVideoPage);
  }

  // Jump to form page that allows user to add new exercise data
  goToAddExercise() {
    this.navCtrl.push(AddExercisePage);
  }

  // Jumps to form page that allows user to enter a new challenge
  goToAddChallenge() {
    this.navCtrl.push(AddChallengePage);
  }
}
