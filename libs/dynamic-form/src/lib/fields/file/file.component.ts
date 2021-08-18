import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FileField } from './file.types';

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
    await this._constructFiles(fileList);
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

  private async _constructFiles(fileList: FileList): Promise<File[]> {
    if (fileList.length === 0) {
      return null;
    }
    // this.fileList = fileList;
    const files = [];
    this.error = '';

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList.item(i);
      const validFile = await this._validateFiles(file);
      console.log(validFile);

      if (validFile) {
        files.push(file);
      }
    }
    this.files = files;

    this.hint = this.getPreviewHint();

    return files;
  }

  private getPreviewHint(): string {
    if (!this.files || this.files.length < 1) {
      return this.field.hint;
    }
    if (this.field.previewHint) {
      return this.field.previewHint;
    }
    return this.field.output === 'data'
      ? 'Processing done!'
      : 'Files ready to upload';
  }

  private async _validateFiles(file: File): Promise<boolean> {
    if (file) {
      const { validation } = this.field;
      if (validation) {
        if (validation.accept) {
          const valid = RegExp(validation.accept).test(file.type);
          if (!valid) {
            this.error = `Invalid format for file ${file.name}!`;
            return false;
          }
        }

        if (validation.maxSize) {
          const valid = file.size <= validation.maxSize * 1000;
          if (!valid) {
            this.error = `File "${file.name}" is too large!`;
            return false;
          }
        }

        if (validation.minSize) {
          const valid = file.size >= validation.minSize * 1000;
          if (!valid) {
            this.error = `File "${file.name}" is too small!`;
            return false;
          }
        }

        const asImage = await new Promise<HTMLImageElement | null>(
          (resolve) => {
            try {
              const reader = new FileReader();
              reader.onload = (event) => {
                const image = new Image();
                image.src = event.target.result as string;
                image.onload = () => {
                  resolve(image);
                };
              };
              reader.readAsDataURL(file);
            } catch (error) {
              // probably not an image
              resolve(null);
            }
          },
        );

        if (asImage) {
          if (validation.minHeight) {
            const valid = asImage.height >= validation.minHeight;
            if (!valid) {
              this.error = `Image's height should be at least ${validation.minHeight}px!`;
              return false;
            }
          }
          if (validation.minWidth) {
            const valid = asImage.width >= validation.minWidth;
            if (!valid) {
              this.error = `Image's width should be at least ${validation.minWidth}px!`;
              return false;
            }
          }
          if (validation.maxHeight) {
            const valid = asImage.height >= validation.maxHeight;
            if (!valid) {
              this.error = `Image's height should not be more than ${validation.maxHeight}px!`;
              return false;
            }
          }
          if (validation.maxWidth) {
            const valid = asImage.width >= validation.maxWidth;
            if (!valid) {
              this.error = `Image's width should not be more than ${validation.maxWidth}px!`;
              return false;
            }
          }
        }
      }
      return true;
    }
    return false;
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
      if (this.control.value instanceof File) {
        this.files = [this.control.value];
        const list = new DataTransfer();
        list.items.add(this.control.value);
        this.fileList = list.files;
      }
      if (
        Array.isArray(this.control.value) &&
        this.control.value[0] instanceof File
      ) {
        this.files = this.control.value;
        const list = new DataTransfer();
        this.files.forEach((file) => {
          list.items.add(file);
        });
        this.fileList = list.files;
      }
      if (this.control.value instanceof FileList) {
        const files = [];
        for (let i = 0; i < this.control.value.length; i++) {
          const file = this.control.value.item(i);
          files.push(file);
        }
        this.files = files;
        this.fileList = this.control.value;
      }
      return this.files;
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
