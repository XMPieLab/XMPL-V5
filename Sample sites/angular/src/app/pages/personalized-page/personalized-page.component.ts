import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-personalized-page',
  templateUrl: './personalized-page.component.html',
  styleUrls: ['./personalized-page.component.scss']
})
export class PersonalizedPageComponent implements OnInit {

  private _rid: string = "";

  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    (window as any).xmpProvider.store.subscribe(this.xmpReady);
  }

  xmpReady = () => {
    console.log((window as any).xmpProvider.store.xmp);
    this._rid = (window as any).xmpProvider.store.xmp.recipientID;
    this.cdr.detectChanges();
  }

  get rid() {
    return this._rid;
  }

  ngOnDestroy() {
    (window as any).xmpProvider.store.unsubscribe(this.xmpReady);
    // (window as any).xmpProvider.clear();
  }
}
