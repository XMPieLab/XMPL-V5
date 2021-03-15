import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-update-info-js-xmpl',
  templateUrl: './update-info-js-xmpl.component.html',
  styleUrls: ['./update-info-js-xmpl.component.scss']
})
export class UpdateInfoJsXmplComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {

    (<any>window).handleSuccess = () => {
      alert('Success')
      window.location.pathname = '/success'
    }


    (<any>window).handleError = () => {
      alert('Error')
      window.location.pathname = '/error'
    }
  }

  ngOnDestroy() : void {
    (window as any).xmpProvider.trackEvent.trackingLeave()
  }

}
