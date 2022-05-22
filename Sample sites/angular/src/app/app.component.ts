import {ApplicationRef, Component } from '@angular/core';
import {debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'xmpl-demo';

  constructor(appRef: ApplicationRef) {
    appRef.isStable
      .pipe(debounceTime((300)))
      .subscribe(() => (window as any).xmpProvider.bind(document.body).render());
  }
}
