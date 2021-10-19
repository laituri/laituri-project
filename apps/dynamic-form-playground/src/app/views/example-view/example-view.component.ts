import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { debounceTime, map, shareReplay } from 'rxjs/operators';
import { DynamicForm } from '../../../environments/environment';

const demoLocales = [
  {
    key: 'en',
    title: 'English',
    default: true,
  },
  {
    key: 'fi',
    title: 'Finnish',
  },
];

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
        const fields = Object.values(data);
        return new DynamicForm({
          fields,
          locales: demoLocales,
        });
      }),
      shareReplay(1),
    );

    this.fieldsJson = this.dynamicForm.pipe(
      map((inputs) => JSON.stringify(inputs.fields.value, null, 2)),
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

  submitResult(values: any) {
    console.log('Submit:', values);
  }
}
