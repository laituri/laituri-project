import { Component, OnInit, Input } from '@angular/core';
import { InfoField } from './info.types';

@Component({
  selector: 'dyna-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  @Input()
  field: InfoField;

  constructor() {}

  ngOnInit(): void {}
}
