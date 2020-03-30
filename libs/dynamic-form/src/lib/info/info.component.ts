import { Component, OnInit, Input } from '@angular/core';
import 'marked/lib/marked';

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
