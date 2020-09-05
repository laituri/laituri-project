import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FileField } from '../dynamic-form.types';

@Component({
  selector: 'dyna-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent implements OnInit {
  @Input()
  field: FileField;
  @Input()
  control: AbstractControl;

  public isHovering: boolean;
  public error: string;
  public hint: string;
  public imagePreview: SafeResourceUrl;
  public files: File[];
  public fileList: FileList;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.hint = this.field.hint;
    this._getInitialFiles();
  }

  async onDrop(fileList: FileList) {
    this.fileList = fileList;
    this._constructFiles(fileList);
    this.imagePreview = this._getImagePreview();
    if (this.error) {
      this.control.setErrors({ message: this.error });
      return console.error(this.error);
    }
    if (this.field.output === 'data') {
      const data = await this.field.events.drop(this.files);
      this.control.setValue(data);
    } else {
      this.field.events.drop(this.files);
      this.control.setValue(this.files);
    }
  }

  public toggleHover(event: boolean) {
    this.isHovering = event;
  }

  private _constructFiles(fileList: FileList): File[] {
    if (fileList.length === 0) {
      return null;
    }
    // this.fileList = fileList;
    const files = [];
    this.hint = this.field.hint;
    this.error = '';
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList.item(i);
      const validFormat = RegExp(this.field.accept).test(
        file.type || file.name,
      );
      if (validFormat) {
        files.push(file);
      } else {
        this.error = `Invalid format for file ${file.name}`;
      }
    }
    this.files = files;

    this.hint =
      this.field.output === 'data'
        ? 'Processing done!'
        : 'Files ready to upload';

    return files;
  }

  private _getImagePreview() {
    if (!this.files || !this.files.length) {
      return null;
    }
    const file = this.files[0];
    const isImage = RegExp('image/*').test(file.type);

    if (!isImage) {
      return null;
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      URL.createObjectURL(file),
    );
  }

  private _getInitialFiles(): File[] {
    const { preview } = this.field;
    if (!preview) {
      return null;
    }
    if (preview.type === 'string' && typeof this.control.value === 'string') {
      try {
        const file = new File([], this.control.value);
        this.files = [file];
        return this.files;
      } catch (error) {
        console.error(
          `Expected control's value to be a valid string. It was not.`,
          {
            error,
          },
        );
        return null;
      }
    }
    if (preview.type === 'string-array' && Array.isArray(this.control.value)) {
      try {
        this.files = this.control.value.map((value) => new File([], value));
        return this.files;
      } catch (error) {
        console.error(
          `Expected control's value to be a valid array. It was not.`,
          {
            error,
          },
        );
        return null;
      }
    }
    if (preview.type === 'object' && typeof this.control.value === 'object') {
      try {
        const file = this.control.value[preview.urlKey];
        this.files = [file];
        return this.files;
      } catch (error) {
        console.error(
          `Expected control's value to be a valid object. It was not.`,
          {
            error,
          },
        );
        return null;
      }
    }
    if (preview.type === 'object-array' && Array.isArray(this.control.value)) {
      try {
        this.files = this.control.value.map(
          (value: object) => new File([], value[preview.urlKey]),
        );
        return this.files;
      } catch (error) {
        console.error(
          `Expected control's value to be a valid array of objects. It was not.`,
          {
            error,
          },
        );
        return null;
      }
    }
  }
}
