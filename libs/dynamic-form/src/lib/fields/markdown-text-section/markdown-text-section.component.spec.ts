import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownTextSectionComponent } from './markdown-text-section.component';

describe('MarkdownTextSectionComponent', () => {
  let component: MarkdownTextSectionComponent;
  let fixture: ComponentFixture<MarkdownTextSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkdownTextSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownTextSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
