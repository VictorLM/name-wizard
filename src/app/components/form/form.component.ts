import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  name: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    //
  }

  onSubmit() {
    if (!this.name || this.name.length < 2) {
      alert('Please, insert a real name!');
      return;
    }

    const cleanName = this.name.split(" ")[0];

    this.router.navigate(['/' + cleanName.toLowerCase()]);

    this.name = '';
  }

}
