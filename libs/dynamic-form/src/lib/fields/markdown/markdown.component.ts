import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import Quill from 'quill';
import turndown from 'turndown/lib/turndown.browser.umd.js';
import { MarkdownToQuill } from 'md-to-quill-delta';
import { DynamicFormFieldBase } from '../../common/dynamic-form-field-base.class';
import { MarkdownElements, MarkdownField } from './markdown.types';

/* TODO:
- How to implement disabled?
*/

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
export class MarkdownComponent extends DynamicFormFieldBase implements OnInit {
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
    const toolbar = this.markdownEditor.getModule('toolbar');
    toolbar.addHandler('image', async (value) => {
      const events = this.field.events;
      const url =
        events && events.getImageUrl
          ? await events.getImageUrl(value)
          : prompt('Link to the image');
      if (url) {
        const range = this.markdownEditor.getSelection();
        this.markdownEditor.insertEmbed(range.index, 'image', url);
        this.markdownEditor.setSelection(range.index + 1, 1);
      }
    });
    const converter = new MarkdownToQuill({ debug: false });
    const ops = converter.convert(this.control.value || '');
    const delta = this.markdownEditor.getContents();
    delta.ops = ops;
    this.markdownEditor.setContents(delta, 'api');

    this.markdownEditor.on('text-change', () => {
      const html = this.markdownEditor.root.innerHTML;
      const markdown = this.converter.turndown(html);
      this.setValue(markdown);
    });
  }

  private setValue(value: string) {
    if (!this.control.disabled) {
      this.control.setValue(value);
    }
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
      ['link', 'image'],
      ['clean'],
    ];

    return toolbar;
  }
}
