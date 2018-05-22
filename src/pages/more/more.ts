import { Component, ViewChild } from "@angular/core";
import { NavController, LoadingController } from "ionic-angular";

// FAB Navigation
import { AddVideoPage } from "../add-video/add-video";
import { AddExercisePage } from "../add-exercise/add-exercise";
import { AddChallengePage } from "../add-challenge/add-challenge";

// MENU PAGES
import { AppSettingsPage } from "../app-settings/app-settings";
import { AboutPage } from "../about/about";
import { FeedbackSupportPage } from "../feedback-support/feedback-support";
import { PersonalDataPage } from "../personal-data/personal-data";
import { LoginPage } from "../login/login";

import { Storage } from "@ionic/storage";

@Component({
  selector: "page-more",
  templateUrl: "more.html"
})
export class MorePage {
  @ViewChild("fab") fab;

  loader: LoadingController;
  private username: string;

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    private loadingCtrl: LoadingController
  ) {
    this.storage.get("currentUser").then(data => {
      this.username = data;
    });
  }

  ionViewWillLeave() {
    this.fab.close();
  }

  goToPersonalData() {
    this.navCtrl.push(PersonalDataPage, {
      username: this.username
    });
  }
  goToAppSettings() {
    this.navCtrl.push(AppSettingsPage, {
      username: this.username
    });
  }
  goToFeedbackSupport() {
    this.navCtrl.push(FeedbackSupportPage, {
      username: this.username
    });
  }
  goToAbout() {
    this.navCtrl.push(AboutPage);
  }

  logout() {
    let loader = this.loadingCtrl.create({
      content: "Logging out..."
    });
    loader.present();

    // resetting current user in storage
    this.storage.ready().then(() => {
      this.storage.set("currentUser", null);
      this.storage.set("sharingData", false);
      this.storage.set("exercises", null);
      loader.dismiss();
    });

    this.navCtrl.setRoot(LoginPage);
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
