import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import {
  CdkDropListGroup,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { ChipItem } from '../dynamic-form.types';
@Component({
  selector: 'dyna-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss'],
})
export class ChipListComponent implements OnInit, AfterViewInit {
  @Input() chips: ChipItem[];
  @Input() enableDrag: boolean;
  @Input() disabled: boolean;

  @Output() dropItem = new EventEmitter<ChipItem[]>();
  @Output() deleteItem = new EventEmitter<string | number>();

  @ViewChild(CdkDropListGroup) listGroup: CdkDropListGroup<CdkDropList>;
  @ViewChild(CdkDropList) placeholder: CdkDropList;

  public target: CdkDropList<any> = null;
  public targetIndex: number;
  public source: CdkDropList<any> = null;
  public sourceIndex: number;
  private insertAfter: boolean;

  constructor() {}

  ngAfterViewInit() {
    const placeholderElement = this.placeholder.element.nativeElement;
    placeholderElement.style.display = 'none';
    placeholderElement.parentNode.removeChild(placeholderElement);
  }

  ngOnInit(): void {}

  public drop() {
    if (!this.target || this.disabled) {
      return;
    }

    const placeholderElement = this.placeholder.element.nativeElement;
    const parent = placeholderElement.parentNode;

    placeholderElement.style.display = 'none';

    parent.removeChild(placeholderElement);
    parent.appendChild(placeholderElement);
    parent.insertBefore(
      this.source.element.nativeElement,
      parent.children[this.sourceIndex],
    );

    this.target = null;
    this.source = null;

    if (this.insertAfter && this.chips.length > this.targetIndex + 1) {
      this.targetIndex++;
    }

    if (this.sourceIndex !== this.targetIndex) {
      moveItemInArray(this.chips, this.sourceIndex, this.targetIndex);
    }

    this.dropItem.emit(this.chips);
  }

  public enter = (drag: CdkDrag<any>, drop: CdkDropList<any>) => {
    if (drop.id === this.placeholder.id) {
      return true;
    }

    const placeholderElement = this.placeholder.element.nativeElement;
    const dropElement = drop.element.nativeElement;

    const dragIndex = __indexOf(
      dropElement.parentNode.children,
      drag.dropContainer.element.nativeElement,
    );
    const dropIndex = __indexOf(dropElement.parentNode.children, dropElement);

    let size = '';
    if (!this.source) {
      this.sourceIndex = dragIndex;
      this.source = drag.dropContainer;

      const sourceElement = this.source.element.nativeElement;
      placeholderElement.style.width = sourceElement.clientWidth + 'px';
      placeholderElement.style.height = sourceElement.clientHeight + 'px';

      sourceElement.parentNode.removeChild(sourceElement);
      size = Array.from(sourceElement.classList).find((c) =>
        c.startsWith('content-item-c'),
      );
    }

    this.targetIndex = dropIndex;
    this.target = drop;

    placeholderElement.style.display = '';
    this.insertAfter = dragIndex < dropIndex;
    dropElement.parentNode.insertBefore(
      placeholderElement,
      this.insertAfter ? dropElement.nextSibling : dropElement,
    );

    const oldSize = Array.from(placeholderElement.classList).find((c) =>
      c.startsWith('content-item-c'),
    );
    if (oldSize) {
      placeholderElement.classList.remove(oldSize);
    }

    if (size) {
      placeholderElement.classList.add(size);
    }

    this.source._dropListRef.start();
    this.placeholder._dropListRef.enter(
      drag._dragRef,
      drag.element.nativeElement.offsetLeft,
      drag.element.nativeElement.offsetTop,
    );

    return false;
    // tslint:disable-next-line: semicolon
  };

  delete(key: string | number) {
    if (!this.disabled) {
      this.deleteItem.emit(key);
    }
  }
}

function __indexOf(collection, node) {
  return Array.prototype.indexOf.call(collection, node);
}
