import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from '../../services/country/country.service';
import { Subscription } from 'rxjs';
import { Countries } from '../../services/country/countries.enum';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  name: string;
  countryCode: Countries | undefined;
  subscription: Subscription;

  constructor(
    private router: Router,
    private countryService: CountryService,
  ) {}

  ngOnInit(): void {
    this.getCountry();
  }

  getCountry(): void {
    // TODO - ERROR HANDLING
    this.subscription = this.countryService.get().subscribe(
      result => {
        if(result?.countryCode) {
          this.countryCode = result.countryCode;
        }
      },
      error => {
        console.log(error);
    });
  }

  onSubmit() {
    const regex = /^[a-zA-Z]+$/;

    if(!this.name || this.name.length < 2 || this.name.length > 12 || !regex.test(this.name)) {
      alert('Please, insert a real first name!');
      this.name = '';
      return;
    }

    if (this.countryCode && !Object.values(Countries).includes(this.countryCode)) {
      alert('Please, select a real country!');
      this.countryCode = undefined;
      return;
    }

    const cleanName = this.name.split(" ")[0];

    this.router.navigate(['/' + cleanName.toLowerCase()], { queryParams: { country: this.countryCode } });

    this.name = '';
    this.countryCode = undefined;
  }

  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
  }

}
