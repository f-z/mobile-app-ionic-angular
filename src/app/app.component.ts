import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { ScreenOrientation } from "@ionic-native/screen-orientation";

import { LearnPage } from "../pages/learn/learn";
import { TrackPage } from "../pages/track/track";
import { ChallengePage } from "../pages/challenge/challenge";
import { MorePage } from "../pages/more/more";

import { LoginPage } from "../pages/login/login";

import { dbProvider } from "../providers/database/dbProvider";
import { ytProvider } from "../providers/youtube/ytProvider";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // making Login Page the root (first) page
  rootPage: any = LoginPage;
  pages: Array<{ title: string; component: any }>;

  // setting tab pages
  tab1Root = LearnPage;
  tab2Root = TrackPage;
  tab3Root = ChallengePage;
  tab4Root = MorePage;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public plt: Platform,
    public screenOrientation: ScreenOrientation,
    private db: dbProvider,
    private youtube: ytProvider
  ) {
    this.initializeApp();
  }

  // performing the necessary actions to initialise our app
  initializeApp() {
    // when the platform is ready and the plugins are available
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    // locking screen to portrait mode if running on the phone
    if (this.plt.is("cordova")) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }

    // reading the data from the back-end for speed
    this.db.readChallenges();
    this.db.readUserSavedVideos();
    this.db.readUserExerciseHistory();
    this.db.readUserSetChallenges();
    this.db.readUserCompletedChallenges();
    this.youtube.readAPIKey();
  }
}
