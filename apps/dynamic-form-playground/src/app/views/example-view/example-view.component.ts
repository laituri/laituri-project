import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Field } from 'dynamic-form';

@Component({
  selector: 'app-example-view',
  templateUrl: './example-view.component.html',
  styleUrls: ['./example-view.component.scss'],
})
export class ExampleViewComponent implements OnInit {
  public fields: Observable<Field[]>;
  public fieldsJson: Observable<string>;
  public result = new BehaviorSubject<string>(null);
  public display: 'form' | 'fields' | 'result' = 'form';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fields = this.route.data.pipe(
      map((data) => Object.values(data)),
    ) as Observable<Field[]>;

    this.fieldsJson = this.fields.pipe(
      map((fields) => JSON.stringify(fields, null, 2)),
    );
  }

  public setDisplay(display: 'form' | 'fields' | 'result') {
    this.display = display;
  }

  updateResult(values: any) {
    console.log('Value change:', values);
    const result = JSON.stringify(values, null, 2);
    this.result.next(result);
  }
}
