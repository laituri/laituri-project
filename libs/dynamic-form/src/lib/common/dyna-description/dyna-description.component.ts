import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dyna-description',
  templateUrl: './dyna-description.component.html',
  styleUrls: ['./dyna-description.component.scss'],
})
export class DynaDescriptionComponent implements OnInit {
  @Input()
  body: string;

  constructor() {}

  ngOnInit(): void {}
}
