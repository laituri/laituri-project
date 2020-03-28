import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownOverlayComponent } from './dropdown-overlay.component';

describe('DropdownOverlayComponent', () => {
  let component: DropdownOverlayComponent;
  let fixture: ComponentFixture<DropdownOverlayComponent>;

  beforeEach(async(() => {
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
