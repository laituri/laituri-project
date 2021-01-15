import { Component, Input, OnInit } from '@angular/core';
import { FieldInfo } from '../../dynamic-form.types';

@Component({
  selector: 'dyna-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  @Input() info: FieldInfo;

  public isOpen = false;

  constructor() {}

  ngOnInit(): void {}
}
