import { ApplicationRef, Component, ChangeDetectionStrategy } from '@angular/core';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class AppComponent {
  title = 'xmpl-angular';

  constructor(appRef: ApplicationRef) {
    appRef.isStable
      .pipe(debounceTime((300)))
      .subscribe(() => (window as any).xmpProvider.bind(document.body).render());
  }
}
