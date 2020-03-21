import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubGroupFormComponent } from './sub-group-form.component';

describe('SubGroupFormComponent', () => {
  let component: SubGroupFormComponent;
  let fixture: ComponentFixture<SubGroupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubGroupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
