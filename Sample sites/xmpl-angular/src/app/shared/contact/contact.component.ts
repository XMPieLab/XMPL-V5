import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
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
