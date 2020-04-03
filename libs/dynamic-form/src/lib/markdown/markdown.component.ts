import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import Quill from 'quill';
import turndown from 'turndown';
import { MarkdownToQuill } from 'md-to-quill-delta';

const defaultElements: MarkdownElements = {
  headings: [1, 2, 3, 4, 5, 6],
  blockquote: true,
  bold: true,
  code: true,
  italic: true,
  strike: true,
  underline: true,
  lists: { bullet: true, ordered: true },
};

@Component({
  selector: 'dyna-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss'],
})
export class MarkdownComponent implements OnInit {
  @Input()
  field: MarkdownField;
  @Input()
  control: AbstractControl;
  @ViewChild('markdownElement', { static: true })
  markdownElement: ElementRef<HTMLTextAreaElement>;

  private markdownEditor: Quill;
  private converter = new turndown({ headingStyle: 'atx' });

  ngOnInit(): void {
    this.markdownEditor = new Quill(this.markdownElement.nativeElement, {
      modules: {
        toolbar: this._constructToolbar(),
        keyboard: {
          bindings: {
            tab: {
              key: 9,
              handler: () => {
                return true;
              },
            },
          },
        },
      },
      readOnly: this.field.disabled,
      placeholder: this.field.placeholder || 'Compose an epic...',
      theme: 'snow',
    });
    const converter = new MarkdownToQuill({ debug: false });
    const ops = converter.convert(this.control.value || '');
    this.markdownEditor.setContents(ops, 'api');

    this.markdownEditor.on('text-change', (delta, source) => {
      const html = this.markdownEditor.root.innerHTML;
      const markdown = this.converter.turndown(html);
      this.setValue(markdown);
    });
  }

  private setValue(value: string) {
    this.control.setValue(value);
  }

  /* Really need to clean this up :D */
  private _constructToolbar() {
    const elements = { ...defaultElements, ...this.field.elements };
    const toolbar = [
      [{ header: [...elements.headings, false] }],
      ['bold', 'italic', 'underline', 'strike'].filter(
        (type) => elements[type],
      ),
      ['blockquote', 'code-block'].filter((type) => elements[type]),
      [{ list: 'ordered' }, { list: 'bullet' }].filter(
        (listType) => elements.lists[listType.list],
      ),
      ['clean'],
    ];

    return toolbar;
  }
}
