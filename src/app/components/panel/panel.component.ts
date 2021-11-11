import { Component, OnInit } from '@angular/core';
import { MeaningService } from '../../services/meaning/meaning.service';
import { parse } from 'node-html-parser';
import { Subscription } from 'rxjs';
import { AgeService } from '../../services/age/age.service';
import { AdviceService } from '../../services/advice/advice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Countries } from '../../services/country/countries.enum';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  name: string;
  countryCode: Countries | undefined;
  age: number | undefined;
  meaning: string | undefined;
  advice: string | undefined;
  loading = {
    meaning: true,
    age: true,
    advice: true,
  };
  subscription: Subscription;

  constructor(
    private meaningService: MeaningService,
    private ageService: AgeService,
    private adviceService: AdviceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.name = this.activatedRoute.snapshot.params.name;
    this.activatedRoute.queryParams.subscribe(params => {
      this.countryCode = params['country'];
    });
  }

  ngOnInit(): void {

    if(!this.name || !this.countryCode) {
      alert('Invalid name and/or country!');
      this.name = '';
      this.countryCode = undefined;
      this.router.navigate(['/']);
    }

    if (this.countryCode && !Object.values(Countries).includes(this.countryCode)) {
      alert('Invalid country!');
      this.countryCode = undefined;
      this.router.navigate(['/']);
    }

    const regex = /^[a-zA-Z]+$/;

    if(!this.name || this.name.length < 2 || this.name.length > 12 || !regex.test(this.name)) {
      alert('Invalid first name!');
      this.name = '';
      this.router.navigate(['/']);
    }

    this.getMeaning();
    this.getAge();
    this.getAdvice();
  }

  getMeaning(): void {
    if(this.name) {
      // TODO - ERROR HANDLING
      this.subscription = this.meaningService.get(this.name).subscribe(
        meaningHTML => {
          if(meaningHTML?.contents) {
            const root = parse(meaningHTML.contents);
            this.meaning = root.querySelector('.namedef')?.innerText;
            if(!root.querySelector('.namedef')) {
              this.getMeaningWithMultipleEntries();
            } else {
              this.loading.meaning = false;
            }
          }
        },
        error => {
          console.log(error);
      });
    }
  }

  getMeaningWithMultipleEntries(): void {
    // TODO - ERROR HANDLING
    this.subscription = this.meaningService.get(this.name + "-1").subscribe(
      meaningHTML => {
        if(meaningHTML?.contents) {
          const root = parse(meaningHTML.contents);
          this.meaning = root.querySelector('.namedef')?.innerText;
          this.loading.meaning = false;
        }
      },
      error => {
        console.log(error);
    });
  }

  getAge(): void {
    if(this.name) {
      // TODO - ERROR HANDLING
      this.subscription = this.ageService.get(this.name, this.countryCode).subscribe(
        result => {
          if(result?.age) {
            this.age = result.age;
            this.loading.age = false;
          }
        },
        error => {
          console.log(error);
      });
    }
  }

  getAdvice(): void {
    // TODO - ERROR HANDLING
    this.subscription = this.adviceService.get().subscribe(
      result => {
        if(result?.slip) {
          this.advice = result.slip?.advice;
          this.loading.advice = false;
        }
      },
      error => {
        console.log(error);
    });
  }

  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
  }

}
