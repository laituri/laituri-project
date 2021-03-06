import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DynamicForm } from 'dynamic-form';

@Component({
  selector: 'app-example-view',
  templateUrl: './example-view.component.html',
  styleUrls: ['./example-view.component.scss'],
})
export class ExampleViewComponent implements OnInit {
  public fieldsJson: Observable<string>;
  public result = new BehaviorSubject<string>(null);
  public display: 'form' | 'fields' | 'result' = 'form';
  public dynamicForm: Observable<DynamicForm>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.dynamicForm = this.route.data.pipe(
      map((data) => {
        return new DynamicForm(Object.values(data));
      }),
      shareReplay(1),
    );

    this.fieldsJson = this.dynamicForm.pipe(
      map((inputs) => JSON.stringify(inputs.getFields().value, null, 2)),
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
