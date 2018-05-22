import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";
import { Http, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Storage } from "@ionic/storage";

@Injectable()
export class dbProvider {
  users: any = null;
  exercises: any = null;
  challenges: any = null;
  playlists: any = null;

  numberOfSetChallengesWeekly = []; // number of set challenges by day
  numberOfCompletedChallengesWeekly = []; // number of completed challenges by day
  numberOfAddedVideosWeekly: any = null; // number of added vids by day
  numberOfAddedExercisesWeekly = []; //  number of added exercises by day

  // initialising module classes
  constructor(
    public http: Http,
    public toastCtrl: ToastController,
    public storage: Storage
  ) {}

  // connecting to the php web app to execute an update sql statement
  updateEntry(body: string, phpURL: string) {
    let type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ "Content-Type": type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = "" + phpURL;

    this.http.post(url, body, options).subscribe(data => {});
  }

  // retrieving most recent user list from database
  readUsers() {
    if (this.users) {
      return Promise.resolve(this.users);
    }

    return new Promise(resolve => {
      this.http
        .get("")
        .map(res => res.json())
        .subscribe(data => {
          this.users = data;
          resolve(this.users);
        });
    });
  }

  // getter for user list
  getUsers() {
    this.users = null;

    return this.readUsers().then(data => {
      return data;
    });
  }

  // retrieving most recent exercise preferences list from database
  readExercisePreferences() {
    if (this.exercises) {
      return Promise.resolve(this.exercises);
    }

    return new Promise(resolve => {
      this.http
        .get(
          ""
        )
        .map(res => res.json())
        .subscribe(data => {
          this.exercises = data;
          resolve(this.exercises);
        });
    });
  }

  // getter for exercise preferences list
  getExercisePreferences() {
    this.exercises = null;

    return this.readExercisePreferences().then(data => {
      return data;
    });
  }

  // retrieving most recent challenges list from database
  readChallenges() {
    if (this.challenges) {
      return Promise.resolve(this.challenges);
    }

    return new Promise(resolve => {
      this.http
        .get("")
        .map(res => res.json())
        .subscribe(data => {
          this.challenges = data;
          resolve(this.challenges);
        });
    });
  }

  // getter for challenges list
  getChallenges() {
    this.challenges = null;

    return this.readChallenges().then(data => {
      return data;
    });
  }

  // querying the challenges list and returning a filtered version
  getFilteredChallenges(queryString) {
    return this.getChallenges().then(Challenges => {
      let theFilteredChallenges: any = [];

      for (let theChallenge of Challenges) {
        if (
          theChallenge.name.toLowerCase().indexOf(queryString.toLowerCase()) >
          -1
        ) {
          theFilteredChallenges.push(theChallenge);
        }
      }

      return theFilteredChallenges;
    });
  }

  // retrieving most recent video playlist from database
  readPlaylists() {
    if (this.playlists) {
      return Promise.resolve(this.playlists);
    }

    return new Promise(resolve => {
      this.http
        .get("")
        .map(res => res.json())
        .subscribe(data => {
          this.playlists = data;
          resolve(this.playlists);
        });
    });
  }

  // getter for video playlist
  getPlaylists() {
    this.playlists = null;

    return this.readPlaylists().then(data => {
      return data;
    });
  }

  // retrieving weekly saved videos array from local storage
  readUserSavedVideos() {
    if (this.numberOfAddedVideosWeekly) {
      return Promise.resolve(this.numberOfAddedVideosWeekly);
    }

    return new Promise(resolve => {
      // getting all watched videos data from storage
      this.storage.get("savedVideosList").then(data => {
        if (data != null) {
          let temp: Array<number> = [0, 0, 0, 0, 0, 0, 0];
          // Set weekly data for bar chart:
          for (let video of data) {
            for (let i = 0; i < 7; i++) {
              let date = new Date();
              date.setDate(date.getDate() - i);
              if (
                video.saveDate.toString().slice(0, 15) ==
                date.toString().slice(0, 15)
              ) {
                temp[6 - i]++;
              }
            }
          }
          this.numberOfAddedVideosWeekly = temp;
          resolve(temp);
        }
      });
    });
  }

  // getter for weekly saved videos array
  getUserSavedVideos() {
    this.numberOfAddedVideosWeekly = null;

    return this.readUserSavedVideos().then(data => {
      return data;
    });
  }

  // retrieving weekly exercise history array from local storage
  readUserExerciseHistory() {
    if (this.numberOfAddedExercisesWeekly) {
      return Promise.resolve(this.numberOfAddedExercisesWeekly);
    }

    return new Promise(resolve => {
      // retrieving most recent exercise preferences data from storage
      this.storage.get("exerciseHistory").then(data => {
        if (data != null) {
          let temp: Array<number> = [0, 0, 0, 0, 0, 0, 0];
          // retrieving weekly exercise data for bar chart
          for (let exercise of data) {
            for (let i = 0; i < 7; i++) {
              let date = new Date();
              date.setDate(date.getDate() - i);
              if (
                exercise.saveDate.toString().slice(0, 15) ==
                date.toString().slice(0, 15)
              ) {
                temp[6 - i]++;
              }
            }
          }
          this.numberOfAddedExercisesWeekly = temp;
          resolve(temp);
        }
      });
    });
  }

  // getter for weekly exercise history array
  getUserExerciseHistory() {
    this.numberOfAddedExercisesWeekly = null;

    return this.readUserExerciseHistory().then(data => {
      return data;
    });
  }

  // retrieving weekly user challenges array from local storage
  readUserSetChallenges() {
    if (this.numberOfSetChallengesWeekly) {
      return Promise.resolve(this.numberOfSetChallengesWeekly);
    }

    return new Promise(resolve => {
      // retrieving most recent user challenges data from storage
      this.storage.get("challengeList").then(data => {
        if (data != null) {
          let temp: Array<number> = [0, 0, 0, 0, 0, 0, 0];
          // retrieving weekly user challenges data for bar chart
          for (let challenge of data) {
            for (let i = 0; i < 7; i++) {
              let date = new Date();
              date.setDate(date.getDate() - i);
              if (
                challenge.saveDate.toString().slice(0, 15) ==
                date.toString().slice(0, 15)
              ) {
                temp[6 - i]++;
              }
            }
          }

          this.numberOfSetChallengesWeekly = temp;
          resolve(temp);
        }
      });
    });
  }

  // getter for weekly user challenges array
  getUserSetChallenges() {
    this.numberOfSetChallengesWeekly = null;

    return this.readUserSetChallenges().then(data => {
      return data;
    });
  }

  // retrieving weekly completed user challenges array from local storage
  readUserCompletedChallenges() {
    if (this.numberOfCompletedChallengesWeekly) {
      return Promise.resolve(this.numberOfCompletedChallengesWeekly);
    }

    return new Promise(resolve => {
      // retrieving most recent completed user challenges data from storage
      this.storage.get("completedChallengeList").then(data => {
        if (data != null) {
          let temp: Array<number> = [0, 0, 0, 0, 0, 0, 0];
          // retrieving weekly completed user challenges data for bar chart
          for (let challenge of data) {
            for (let i = 0; i < 7; i++) {
              let date = new Date();
              date.setDate(date.getDate() - i);
              if (
                challenge.saveDate.toString().slice(0, 15) ==
                date.toString().slice(0, 15)
              ) {
                temp[6 - i]++;
              }
            }
          }

          this.numberOfCompletedChallengesWeekly = temp;
          resolve(this.numberOfCompletedChallengesWeekly);
        }
      });
    });
  }

  // getter for weekly completed user challenges array
  getUserCompletedChallenges() {
    this.numberOfCompletedChallengesWeekly = null;

    return this.readUserCompletedChallenges().then(data => {
      return data;
    });
  }

  // notifying the user of the outcome of remote operations
  sendNotification(message): void {
    let notification = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "top",
      cssClass: "toast"
    });

    notification.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    notification.present();
  }
}
