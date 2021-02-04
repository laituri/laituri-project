import { ConnectedPosition } from '@angular/cdk/overlay';
import { Component, Input, OnInit } from '@angular/core';
import { FieldInfo } from '../../dynamic-form.types';

@Component({
  selector: 'dyna-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  @Input() info: FieldInfo;

  public isOpen = false;

  public connectedOverlayPositions: ConnectedPosition[] = [
    {
      originX: 'center',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      weight: 0.2,
    },
    {
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom',
      weight: 0.1,
    },
    {
      originX: 'center',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom',
      weight: 0,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
