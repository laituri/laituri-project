import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubArrayFormComponent } from './sub-array-form.component';

describe('SubArrayFormComponent', () => {
  let component: SubArrayFormComponent;
  let fixture: ComponentFixture<SubArrayFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubArrayFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubArrayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
