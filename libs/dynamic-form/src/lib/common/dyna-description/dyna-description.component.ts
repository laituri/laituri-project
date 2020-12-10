import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'dyna-description',
  templateUrl: './dyna-description.component.html',
  styleUrls: ['./dyna-description.component.scss'],
})
export class DynaDescriptionComponent implements OnInit {
  @Input()
  body: string;
  @Input()
  template: TemplateRef<any>;

  constructor() {}

  ngOnInit(): void {}
}
