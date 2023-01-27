import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnDestroy {
  constructor(private cdr: ChangeDetectorRef) {}
  ClubMemberLogo = 'assets/images/ClubMemberLogo.png'
  photo1 = ''
  photo2 = ''
  photo3 = ''
  photo4 = ''

  ngOnInit(): void {
    (window as any).xmpProvider.store.subscribe(this.xmpReady);
  }

  xmpReady = () => {
    this.photo1 = (window as any).xmpProvider.store.xmp.r.photo1
    this.photo2 = (window as any).xmpProvider.store.xmp.r.photo2
    this.photo3 = (window as any).xmpProvider.store.xmp.r.photo3
    this.photo4 = (window as any).xmpProvider.store.xmp.r.photo4

    this.cdr.detectChanges()

  }

  ngOnDestroy() : void {
    (window as any).xmpProvider.trackEvent.trackingLeave()
  }
}
