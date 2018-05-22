import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ytProvider } from "../../providers/youtube/ytProvider";
import { Storage } from "@ionic/storage";
import { dbProvider } from "../../providers/database/dbProvider";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable } from "rxjs/Observable";

@IonicPage()
@Component({
  selector: "page-add-video",
  templateUrl: "add-video.html"
})
export class AddVideoPage {
  featuredVideo: any;
  allVideo: any;
  featuredVideosForm: FormGroup;
  allVideosForm: FormGroup;
  allVideos: Observable<any[]>;
  featuredVideos: Observable<any[]>;
  savedVideosList: Array<Object> = [];
  selectedVideo: any = null;
  badSubmitAttempt: boolean = false;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    private ytProvider: ytProvider,
    private storage: Storage,
    private db: dbProvider
  ) {
    // load the list of featured videos from storage
    let featuredListId = "";
    this.featuredVideos = this.ytProvider.getListVideos(featuredListId);

    // load the list of all videos from storage
    let listId = "";
    this.allVideos = this.ytProvider.getListVideos(listId);

    this.featuredVideosForm = formBuilder.group({
      featuredVideo: [""]
    });

    this.allVideosForm = formBuilder.group({
      allVideo: [""]
    });
  }

  ionViewWillEnter() {
    // get most recent version of saved videos array
    this.storage.get("savedVideosList").then(data => {
      if (data != null) {
        this.savedVideosList = data;
      }
    });
  }

  select(video) {
    this.selectedVideo = video;
  }

  logVideoForm() {
    let currentDate = new Date();
    let dateString = currentDate.toDateString();

    if (this.selectedVideo != null) {
      // Add video to saved videos array:
      this.savedVideosList.push({
        name: this.selectedVideo,
        saveDate: dateString
      });
      // Add saved videos to storage:
      this.storage.ready().then(() => {
        this.storage.set("savedVideosList", this.savedVideosList);
      });

      this.presentAdditionToast();

      this.navCtrl.pop();
    } else {
      this.db.sendNotification("Please select a video from the list!");
    }
  }

  // Toast notification if a challenge is added
  presentAdditionToast() {
    this.db.sendNotification("New video added!");
  }
}
