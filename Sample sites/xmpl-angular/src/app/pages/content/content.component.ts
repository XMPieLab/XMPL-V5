import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnDestroy {
  ngOnDestroy() : void {
    (window as any).xmpProvider.trackEvent.trackingLeave()
  }
}
