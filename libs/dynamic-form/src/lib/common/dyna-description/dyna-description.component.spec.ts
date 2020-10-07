import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynaDescriptionComponent } from './dyna-description.component';

describe('DynaDescriptionComponent', () => {
  let component: DynaDescriptionComponent;
  let fixture: ComponentFixture<DynaDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynaDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynaDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
