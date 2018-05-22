import { Component, ViewChild } from "@angular/core";
import {
  NavController,
  Platform,
  reorderArray,
  ItemSliding
} from "ionic-angular";
import { ytProvider } from "../../providers/youtube/ytProvider";
import { YoutubeVideoPlayer } from "@ionic-native/youtube-video-player";
import { Observable } from "rxjs/Observable";
import { Storage } from "@ionic/storage";
import { dbProvider } from "../../providers/database/dbProvider";

// FAB Navigation
import { AddVideoPage } from "../add-video/add-video";
import { AddExercisePage } from "../add-exercise/add-exercise";
import { AddChallengePage } from "../add-challenge/add-challenge";

@Component({
  selector: "page-learn",
  templateUrl: "learn.html"
})
export class LearnPage {
  @ViewChild("fab") fab;

  currentLearnTab;
  allVideos: Observable<any[]>;
  featuredVideos: Observable<any[]>;
  playlists: any = null;
  savedVideos: any = {};
  searchQuery: string = "";
  reorderIsEnabled = false;

  constructor(
    public navCtrl: NavController,
    private ytProvider: ytProvider,
    private youtube: YoutubeVideoPlayer,
    private plt: Platform,
    private storage: Storage,
    private db: dbProvider
  ) {
    this.currentLearnTab = "Featured";

    db.getPlaylists().then(theResult => {
      this.playlists = theResult;
      this.featuredVideos = this.ytProvider.getListVideos(this.playlists[0].id);
      this.allVideos = this.ytProvider.getListVideos(this.playlists[1].id);
    });
  }

  openVideo(video) {
    if (this.plt.is("cordova")) {
      this.youtube.openVideo(video.snippet.resourceId.videoId);
    } else {
      window.open(
        "https://www.youtube.com/watch?v=" + video.snippet.resourceId.videoId
      );
    }
  }

  ionViewWillEnter() {
    this.storage.get("savedVideosList").then(data => {
      this.savedVideos = data;
    });
  }

  ionViewWillLeave() {
    this.fab.close();
  }

  toggleReorder() {
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  itemReordered($event) {
    reorderArray(this.savedVideos, $event);
    this.storage.ready().then(() => {
      this.storage.set("savedVideosList", this.savedVideos);
    });
  }

  deleteEntry(slidingItem: ItemSliding, video: any) {
    // gettin the index of the video to be deleted
    let index = this.savedVideos.indexOf(video);
    if (index > -1) {
      this.savedVideos.splice(index, 1);
    }
    // resetting the saved videos list in storage
    this.storage.ready().then(() => {
      this.storage.set("savedVideosList", this.savedVideos);
    });

    slidingItem.close();
    this.presentDeletionToast();
  }

  // presenting toast notification when a challenge is deleted
  presentDeletionToast() {
    this.db.sendNotification("Video deleted!");
  }

  // FAB Navigation
  // jumping to form page that allows user to add new exercise data
  goToAddVideo() {
    this.navCtrl.push(AddVideoPage);
  }

  // jumping to form page that allows user to add new exercise data
  goToAddExercise() {
    this.navCtrl.push(AddExercisePage);
  }

  // jumping to form page that allows user to enter a new challenge
  goToAddChallenge() {
    this.navCtrl.push(AddChallengePage);
  }
}
