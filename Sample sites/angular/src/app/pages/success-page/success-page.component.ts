import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.scss']
})
export class SuccessPageComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy() : void {
    (window as any).xmpProvider.trackEvent.trackingLeave()
  }
}
