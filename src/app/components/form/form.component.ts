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
    const regex = /^[a-zA-Z]+$/;

    if(!this.name || this.name.length < 2 || this.name.length > 12 || !regex.test(this.name)) {
      alert('Please, insert a real first name!');
      this.name = '';
      return;
    }

    const cleanName = this.name.split(" ")[0];

    this.router.navigate(['/' + cleanName.toLowerCase()]);

    this.name = '';
  }

}
