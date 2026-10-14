import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class ContentComponent implements OnDestroy {
  ngOnDestroy() : void {
    (window as any).xmpProvider.trackEvent.trackingLeave()
  }
}
