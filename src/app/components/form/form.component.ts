import { Component, OnInit } from '@angular/core';
import { MeaningService } from '../../services/meaning/meaning.service';
import { parse } from 'node-html-parser';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  meaning: string | undefined;

  constructor(private meaningService: MeaningService) { }

  ngOnInit(): void {
    this.meaningService.test().subscribe(
      (test) => {
        const temp = test?.contents;
        // console.log(this.test);
        const root = parse(temp);
        this.meaning = root.querySelector('.namedef')?.innerText;
        // console.log(root.querySelector('.namedef')?.innerText);
      });
  }

}
