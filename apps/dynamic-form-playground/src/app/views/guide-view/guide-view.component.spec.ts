import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GuideViewComponent } from './guide-view.component';

describe('GuideViewComponent', () => {
  let component: GuideViewComponent;
  let fixture: ComponentFixture<GuideViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
