import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Storage } from "@ionic/storage";
import { LoadingController } from "ionic-angular";

@Injectable()
export class ytProvider {
  apiKey: string = null;

  constructor(
    public http: Http,
    private storage: Storage,
    private loadingCtrl: LoadingController
  ) {
    // if api key is not set, so this is the first time someone logs in to the app
    this.storage.get("apiKey").then(data => {
      if (data === null) {
        let loader = this.loadingCtrl.create({
          content: "Loading..."
        });
        loader.present();

        this.readAPIKey().then(theResult => {
          loader.dismiss();
        });
      } else {
        // loading current api key from storage and going straight to the learn page
        this.apiKey = data;
      }
    });
  }

  // reading the API key from the database
  readAPIKey() {
    if (this.apiKey) {
      return Promise.resolve(this.apiKey);
    }

    // retrieving most recent user data from database
    return new Promise(resolve => {
      this.http
        .get(
          ""
        )
        .map(res => res.json())
        .subscribe(data => {
          this.apiKey = data[0].key;
          this.storage.ready().then(() => {
            this.storage.set("apiKey", this.apiKey);
          });
          resolve(data);
        });
    });
  }

  // getter for the API key
  getAPIKey() {
    this.apiKey = null;

    return this.readAPIKey().then(data => {
      return data;
    });
  }

  // getting the playlists belonging to a certain channel via the YouTube Data API
  getPlaylistsForChannel(channel) {
    return this.http
      .get(
        "https://www.googleapis.com/youtube/v3/playlists?key=" +
          this.apiKey +
          "&channelId=" +
          channel +
          "&part=snippet,id&maxResults=20"
      )
      .map(res => {
        return res.json()["items"];
      });
  }

  // getting the videos belonging to a certain playlist via the YouTube Data API
  getListVideos(listId) {
    return this.http
      .get(
        "https://www.googleapis.com/youtube/v3/playlistItems?key=" +
          this.apiKey +
          "&playlistId=" +
          listId +
          "&part=snippet,id&maxResults=20"
      )
      .map(res => {
        return res.json()["items"];
      });
  }
}
