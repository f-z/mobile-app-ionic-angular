import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PrivacySetupPage } from '../privacy-setup/privacy-setup';

/**
 * Generated class for the ExercisePrefSetupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exercise-pref-setup',
  templateUrl: 'exercise-pref-setup.html',
})
export class ExercisePrefSetupPage {

  private username: string;
  private password: string;
  private email: string;
  private ageGroup: string;
  private height: number;
  private weight: number;
  private running: boolean;
  private yoga: boolean;
  private pilates: boolean;
  private cycling: boolean;
  private weights: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.username = this.navParams.get('username');
    this.password = this.navParams.get('password');
    this.email = this.navParams.get('email');
    this.ageGroup = this.navParams.get('ageGroup');
    this.height = this.navParams.get('height');
    this.weight = this.navParams.get('weight');

  }

  goToPrivacySetupPage() {

    this.navCtrl.push(PrivacySetupPage,
      {
        username: this.username,
        password: this.password,
        email: this.email,
        ageGroup: this.ageGroup,
        height: this.height,
        weight: this.weight,
        running: this.running,
        yoga: this.yoga,
        pilates: this.pilates,
        cycling: this.cycling,
        weights: this.weights
      })
  }
}
