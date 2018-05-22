import { Component } from "@angular/core";

import { LearnPage } from "../learn/learn";
import { TrackPage } from "../track/track";
import { ChallengePage } from "../challenge/challenge";
import { MorePage } from "../more/more";

import { NavParams } from "ionic-angular";

@Component({
  selector: "page-tabs",
  templateUrl: "tabs.html"
})
export class TabsPage {
  index: any;

  tab1Root = LearnPage;
  tab2Root = TrackPage;
  tab3Root = ChallengePage;
  tab4Root = MorePage;

  constructor(public navParams: NavParams) {
    this.index = this.navParams.get("index");
  }
}
