import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SortableOptions, SortableEvent } from 'sortablejs';
@Component({
  selector: 'dyna-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss'],
})
export class ChipListComponent implements OnInit {
  @Input() chips: ChipItem[];
  @Input() enableDrag: boolean;

  @Output() dropItem = new EventEmitter<ChipItem[]>();

  public sortableOptions: SortableOptions;

  constructor() {}

  ngOnInit(): void {
    this.sortableOptions = {
      animation: 300,
      disabled: !this.enableDrag,
      direction: 'horizontal',
      easing: 'ease-out',
      onEnd: e => {
        console.log(1, e);
        this.dropItem.emit(this.chips);
      },
    };
  }
}
