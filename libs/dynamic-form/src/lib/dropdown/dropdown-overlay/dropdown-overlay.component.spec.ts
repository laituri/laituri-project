import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DropdownOverlayComponent } from './dropdown-overlay.component';

describe('DropdownOverlayComponent', () => {
  let component: DropdownOverlayComponent;
  let fixture: ComponentFixture<DropdownOverlayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
