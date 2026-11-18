import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class ContactComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}

  isShowThanksBlog: Boolean = false

  ngOnInit() {
    (<any>window).hideForm = (message: any) => {
      this.isShowThanksBlog = true
      this.cdr.detectChanges();
    }
  }
}
