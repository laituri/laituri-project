import { Component, Input, OnInit } from '@angular/core';
import { MarkdownTextSectionField } from './markdown-text-section.types';

@Component({
  selector: 'dyna-markdown-text-section',
  templateUrl: './markdown-text-section.component.html',
  styleUrls: ['./markdown-text-section.component.scss'],
})
export class MarkdownTextSectionComponent implements OnInit {
  @Input()
  field: MarkdownTextSectionField;

  ngOnInit(): void {}
}
