import { Component, ViewChild } from "@angular/core";
import {
  NavController,
  ItemSliding,
  Platform,
  ModalController,
  NavParams
} from "ionic-angular";
import { Chart } from "chart.js";

import { AddVideoPage } from "../add-video/add-video";
import { AddExercisePage } from "../add-exercise/add-exercise";
import { EditExercisePage } from "../edit-exercise/edit-exercise";
import { AddChallengePage } from "../add-challenge/add-challenge";

import { Storage } from "@ionic/storage";
import { dbProvider } from "../../providers/database/dbProvider";

@Component({
  selector: "page-track",
  templateUrl: "track.html"
})
export class TrackPage {
  @ViewChild("fab") fab; // Pulls the FAB from the HTML
  @ViewChild("barCanvas") barCanvas; // Pulls the bar chart from the HTML

  currentTrackTab;

  exerciseHistory = [];
  numberOfSavedVideos = 0;
  numberOfCompletedExercises = 0;
  numberOfSetChallenges = 0;
  numberOfCompletedChallenges = 0;

  numberOfSetChallengesWeekly: any = null; // number of set challenges by day
  numberOfCompletedChallengesWeekly: any = null; // number of completed challenges by day
  numberOfAddedVideosWeekly: any = null; // number of added vids by day
  numberOfAddedExercisesWeekly: any = null; //  number of added exercises by day

  barChart: any = null;

  // bar chart current date setup for labels
  public date: string = new Date().toLocaleString("en-gb", {
    weekday: "short"
  });
  public dateMin1: string = new Date(Date.now() - 864e5).toLocaleString(
    "en-gb",
    { weekday: "short" }
  );
  public dateMin2: string = new Date(Date.now() - 2 * 864e5).toLocaleString(
    "en-gb",
    { weekday: "short" }
  );
  public dateMin3: string = new Date(Date.now() - 3 * 864e5).toLocaleString(
    "en-gb",
    { weekday: "short" }
  );
  public dateMin4: string = new Date(Date.now() - 4 * 864e5).toLocaleString(
    "en-gb",
    { weekday: "short" }
  );
  public dateMin5: string = new Date(Date.now() - 5 * 864e5).toLocaleString(
    "en-gb",
    { weekday: "short" }
  );
  public dateMin6: string = new Date(Date.now() - 6 * 864e5).toLocaleString(
    "en-gb",
    { weekday: "short" }
  );

  constructor(
    public platform: Platform,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public plt: Platform,
    private storage: Storage,
    private db: dbProvider
  ) {
    this.currentTrackTab = "Statistics"; // default tab for this page
  }

  // reloading the page using the most recent data when about to enter
  ionViewWillEnter() {
    this.reloadData();

    // Get data from storage when the user enters the view (useful if the user has updated values during a session)
    this.storage.get("savedVideosList").then(data => {
      if (data != null) {
        this.numberOfSavedVideos = data.length;
      }
    });

    this.storage.get("exerciseHistory").then(data => {
      if (data != null) {
        this.exerciseHistory = data;
        this.numberOfCompletedExercises = data.length;
      }
    });

    this.storage.get("challengeList").then(data => {
      if (data != null) {
        this.numberOfSetChallenges = data.length;
      }
    });

    this.storage.get("completedChallengeList").then(data => {
      if (data != null) {
        this.numberOfCompletedChallenges = data.length;
      }
    });

    // Timeout for bar chart refresh due to asynchronous nature of JS
    setTimeout(() => {
      this.barChart = this.getBarChart();
    }, 150);
  }

  ionViewWillLeave() {
    this.fab.close(); // closing FAB if it is open
  }

  // refreshing the page when moving between segments
  refresh() {
    this.reloadData();

    setTimeout(() => {
      this.barChart = this.getBarChart();
    }, 150);
  }

  // loading the most recent data from local storage
  reloadData() {
    this.db.getUserSavedVideos().then(theResult => {
      this.numberOfAddedVideosWeekly = theResult;
    });

    this.db.getUserExerciseHistory().then(theResult => {
      this.numberOfAddedExercisesWeekly = theResult;
    });

    this.db.getUserSetChallenges().then(theResult => {
      this.numberOfSetChallengesWeekly = theResult;
    });

    this.db.getUserCompletedChallenges().then(theResult => {
      this.numberOfCompletedChallengesWeekly = theResult;
    });
  }

  // creating a bar chart using the most recent data and displaying it
  getBarChart() {
    if (this.currentTrackTab === "Statistics") {
      let data = {
        labels: [
          this.dateMin6,
          this.dateMin5,
          this.dateMin4,
          this.dateMin3,
          this.dateMin2,
          this.dateMin1,
          this.date
        ],
        datasets: [
          {
            label: "Added videos",
            data: this.numberOfAddedVideosWeekly,
            backgroundColor: "rgba(0,156,166,1)"
          },
          {
            label: "Added exercises",
            data: this.numberOfAddedExercisesWeekly,
            backgroundColor: "rgba(45,204,211,1)"
          },
          {
            label: "Added challenges",
            data: this.numberOfSetChallengesWeekly,
            backgroundColor: "rgba(228,93,191,1)"
          },
          {
            label: "Completed challenges",
            data: this.numberOfCompletedChallengesWeekly,
            backgroundColor: "rgba(175,22,133,1)"
          }
        ]
      };

      // Bar chart options
      let options = {
        legend: {
          position: "bottom",
          labels: {
            boxWidth: 100
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                callback: function(value) {
                  if (value % 1 === 0) {
                    return value;
                  }
                }
              },
              stacked: true
            }
          ],
          xAxes: [
            {
              stacked: true
            }
          ]
        }
      };

      return this.getChart(this.barCanvas.nativeElement, "bar", data, options);
    }
  }

  // getting a chart of the specified type displaying the supplied data
  getChart(context, chartType, data, options?) {
    if (this.barChart != null) {
      this.barChart.destroy();
    }

    return new Chart(context, {
      data,
      options,
      type: chartType
    });
  }

  // presenting toast notification when an exercise is deleted
  presentDeletionToast() {
    this.db.sendNotification("Exercise deleted!");
  }

  // jumping to form page that allows user to edit existing exercise data
  goToEditExercise(slidingItem: ItemSliding, exercise: any) {
    let index = this.exerciseHistory.indexOf(exercise);
    this.navCtrl.push(EditExercisePage, {
      index: index,
      history: this.exerciseHistory
    });
    slidingItem.close();
  }

  // permanently removing an item from the exercise list
  deleteEntry(slidingItem: ItemSliding, exercise: any) {
    // Delete exercise from array
    let index = this.exerciseHistory.indexOf(exercise);
    if (index > -1) {
      this.exerciseHistory.splice(index, 1);
    }

    // storing the updated exercise list in storage
    this.storage.ready().then(() => {
      this.storage.set("exerciseHistory", this.exerciseHistory);
    });

    slidingItem.close();
    this.presentDeletionToast();
  }

  // FAB Navigation
  // pushing form page that allows user to add new exercise data
  goToAddVideo() {
    this.navCtrl.push(AddVideoPage);
  }

  // pushing form page that allows user to add new exercise data
  goToAddExercise() {
    this.navCtrl.push(AddExercisePage, {
      callback: this.myCallbackFunction
    });
  }

  // pushing form page that allows user to enter a new challenge
  goToAddChallenge() {
    this.navCtrl.push(AddChallengePage, {
      callback: this.myCallbackFunction
    });
  }

  myCallbackFunction = function(_params) {
    return new Promise((resolve, reject) => {
      this.refresh();
      resolve();
    });
  };
}
