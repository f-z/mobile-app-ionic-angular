import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";
import { IonicStorageModule } from "@ionic/storage";
import { ScreenOrientation } from "@ionic-native/screen-orientation";

import { TabsPage } from "../pages/tabs/tabs";
import { TrackPage } from "../pages/track/track";
import { ChallengePage } from "../pages/challenge/challenge";
import { LearnPage } from "../pages/learn/learn";
import { MorePage } from "../pages/more/more";
import { HttpModule } from "@angular/http";
import { AddVideoPage } from "../pages/add-video/add-video";
import { AddExercisePage } from "../pages/add-exercise/add-exercise";
import { EditExercisePage } from "../pages/edit-exercise/edit-exercise";
import { AddChallengePage } from "../pages/add-challenge/add-challenge";
import { EditChallengePage } from "../pages/edit-challenge/edit-challenge";

// More tag pages
import { AppSettingsPage } from "../pages/app-settings/app-settings";
import { AboutPage } from "../pages/about/about";
import { ChangePasswordPage } from "../pages/change-password/change-password";
import { ChangePrivacyPage } from "../pages/change-privacy/change-privacy";
import { ExercisePreferencesPage } from "../pages/exercise-preferences/exercise-preferences";
import { FeedbackSupportPage } from "../pages/feedback-support/feedback-support";
import { PersonalDataPage } from "../pages/personal-data/personal-data";
import { PersonalHeightPage } from "../pages/personal-height/personal-height";
import { PersonalWeightPage } from "../pages/personal-weight/personal-weight";

// profile setup pages
import { ProfileSetupPage } from "../pages/profile-setup/profile-setup";
import { HeightWeightSetupPage } from "../pages/height-weight-setup/height-weight-setup";
import { ExercisePrefSetupPage } from "../pages/exercise-pref-setup/exercise-pref-setup";
import { PrivacySetupPage } from "../pages/privacy-setup/privacy-setup";

import { LoginPage } from "../pages/login/login";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

// providers
import { YoutubeVideoPlayer } from "@ionic-native/youtube-video-player";
import { ytProvider } from "../providers/youtube/ytProvider";
import { dbProvider } from "../providers/database/dbProvider";

@NgModule({
  declarations: [
    MyApp,
    TrackPage,
    ChallengePage,
    LearnPage,
    TabsPage,
    MorePage,
    AddVideoPage,
    AddExercisePage,
    EditExercisePage,
    AddChallengePage,
    EditChallengePage,
    AboutPage,
    PersonalDataPage,
    AppSettingsPage,
    FeedbackSupportPage,
    ExercisePreferencesPage,
    PersonalHeightPage,
    PersonalWeightPage,
    ChangePasswordPage,
    ChangePrivacyPage,
    ProfileSetupPage,
    HeightWeightSetupPage,
    ExercisePrefSetupPage,
    PrivacySetupPage,
    LoginPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicStorageModule.forRoot(),
    // setting icon mode to Material Design
    IonicModule.forRoot(MyApp, {
      iconMode: "md"
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TrackPage,
    ChallengePage,
    LearnPage,
    TabsPage,
    MorePage,
    AddVideoPage,
    AddExercisePage,
    EditExercisePage,
    AddChallengePage,
    EditChallengePage,
    AboutPage,
    PersonalDataPage,
    AppSettingsPage,
    FeedbackSupportPage,
    ExercisePreferencesPage,
    PersonalHeightPage,
    PersonalWeightPage,
    ChangePasswordPage,
    ChangePrivacyPage,
    ProfileSetupPage,
    HeightWeightSetupPage,
    ExercisePrefSetupPage,
    PrivacySetupPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ytProvider,
    YoutubeVideoPlayer,
    dbProvider,
    ScreenOrientation
  ]
})
export class AppModule {}
