import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'dyna-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss'],
})
export class ChipListComponent implements OnInit {
  @Input() chips: ChipItem[];

  constructor() {}

  ngOnInit(): void {}
}
