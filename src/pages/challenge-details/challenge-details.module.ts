import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChallengeDetailsPage } from './challenge-details';

@NgModule({
  declarations: [
    ChallengeDetailsPage
  ],
  imports: [
    IonicPageModule.forChild(ChallengeDetailsPage)
  ],
})
export class ChallengeDetailsPageModule {}
