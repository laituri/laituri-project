import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'dyna-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent {
  @Input()
  field: TextField;
  @Input()
  control: AbstractControl;
  @Input()
  type: TextFieldTypes = 'text';
}
