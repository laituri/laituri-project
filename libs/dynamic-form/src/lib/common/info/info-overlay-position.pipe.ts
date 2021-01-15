import {
  CdkOverlayOrigin,
  FlexibleConnectedPositionStrategy,
  Overlay,
} from '@angular/cdk/overlay';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'overlayPositionStrategy',
})
export class OverlayPositionStrategy implements PipeTransform {
  constructor(private overlay: Overlay) {}
  transform(origin: CdkOverlayOrigin): FlexibleConnectedPositionStrategy {
    return this.overlay
      .position()
      .flexibleConnectedTo(origin ? origin.elementRef : document.body)
      .withPositions([
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
        },
      ]);
  }
}
