import {Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anonymous-page',
  templateUrl: './anonymous-page.component.html',
  styleUrls: ['./anonymous-page.component.scss']
})
export class AnonymousPageComponent implements OnInit {
  showRegister = false;

  constructor() { }

  ngOnInit(): void {
  }

  show(): void {
    this.showRegister = true;
  }
}
