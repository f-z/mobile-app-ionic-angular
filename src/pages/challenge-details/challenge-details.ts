import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the ChallengeDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-challenge-details",
  templateUrl: "challenge-details.html"
})
export class ChallengeDetailsPage {
  challengeInfo: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.challengeInfo = this.navParams.data.challengeData;
    console.log(this.challengeInfo);
  }

  ionViewDidLoad() {
    console.log("Loaded Challenge Details Page");
  }
}
