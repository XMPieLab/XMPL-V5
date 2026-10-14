import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class HeaderComponent {
  logoSrc = 'assets/images/RoundTravel_Logo.png'
  isShowMenu = false

  showMenu($event: any) {
    $event.preventDefault()
    this.isShowMenu = true
  }

  hideMenu() {
    this.isShowMenu = false
  }
}
