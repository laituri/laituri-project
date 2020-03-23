import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import datepicker from 'js-datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'dyna-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [DatePipe],
})
export class DateComponent implements OnInit {
  @Input()
  field: DateField;
  @Input()
  control: AbstractControl;

  @ViewChild('pickerElement', { static: true }) pickerElement: ElementRef<
    HTMLInputElement
  >;

  private picker: any;

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.picker = datepicker(this.pickerElement.nativeElement, {
      formatter: (input: HTMLInputElement, date: Date) => {
        const output = this.field.output || 'y-MM-dd';
        const outputValue = this.datePipe.transform(date, output);
        this.setValue(outputValue);
        const display = this.field.display || 'fullDate';
        const displayValue = this.datePipe.transform(date, display);
        input.value = displayValue;
      },
    });
  }

  private setValue(value: string) {
    this.control.setValue(value);
  }
}
