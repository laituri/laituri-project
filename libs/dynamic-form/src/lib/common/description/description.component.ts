import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'dyna-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent implements OnInit {
  @Input()
  body: string;
  @Input()
  template: TemplateRef<any>;

  constructor() {}

  ngOnInit(): void {}
}
