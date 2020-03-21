import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'dyna-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent implements OnInit {
  @Input()
  field: TextField;
  @Input()
  control: AbstractControl;
  @Input()
  type: 'text' | 'email' | 'tel' | 'number' | 'password' | 'search' | 'url' =
    'text';
  constructor() {}

  ngOnInit() {}
}
