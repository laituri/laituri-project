import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import Quill from 'quill';
import { Converter } from 'showdown';

@Component({
  selector: 'dyna-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss'],
})
export class MarkdownComponent implements OnInit {
  @Input()
  field: TextareaField;
  @Input()
  control: AbstractControl;
  @ViewChild('markdownElement', { static: true })
  markdownElement: ElementRef<HTMLTextAreaElement>;

  private markdownEditor: Quill;
  private converter = new Converter();

  ngOnInit(): void {
    this.markdownEditor = new Quill(this.markdownElement.nativeElement, {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['image', 'code-block'],
        ],
      },
      placeholder: 'Compose an epic...',
      theme: 'snow',
    });

    this.markdownEditor.on('text-change', (delta, source) => {
      const html = this.markdownEditor.root.innerHTML;

      const markdown = this.converter.makeMarkdown(html);

      this.setValue(markdown);
    });
  }

  private setValue(value: string) {
    this.control.setValue(value);
  }
}
