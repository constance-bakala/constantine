import { Injectable }           from '@angular/core';
import {AdItemComponent2} from '../components/advertisements/ad-item/ad-item-component2.component';
import {HeroProfileComponent} from '../components/advertisements/details/hero-profile/hero-profile.component';
import {HeroJobAdComponent} from '../components/advertisements/details/hero-job-add/hero-job-ad.component';


@Injectable()
export class AdService {
  getRandomNumber(): number {
   return Math.floor(Math.random() * 10);
  }

  getAds() {
    return [
      /*new AdItemComponent2(HeroProfileComponent, {name: 'Bombasto', bio: 'Brave as they come', headerImg: 'assets/dresses/dress-'+ this.getRandomNumber()+'.jpeg'}),

      new AdItemComponent2(HeroProfileComponent, {name: 'Dr IQ', bio: 'Smart as they come', headerImg: 'assets/jewellery/jewellery-'+ this.getRandomNumber()+'.jpeg'}),

      new AdItemComponent2(HeroJobAdComponent,   {headline: 'Hiring for several positions', headerImg: 'assets/masks/mask-'+ this.getRandomNumber()+'.jpeg',
        body: 'Submit your resume today!'}),

       */
    ];
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
