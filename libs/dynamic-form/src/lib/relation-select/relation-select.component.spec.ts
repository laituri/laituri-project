import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationSelectComponent } from './relation-select.component';

describe('RelationSelectComponent', () => {
  let component: RelationSelectComponent;
  let fixture: ComponentFixture<RelationSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
