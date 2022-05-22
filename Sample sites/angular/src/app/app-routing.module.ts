import { UpdateInfoJsXmplComponent } from './pages/update-info-js-xmpl/update-info-js-xmpl.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AnonymousPageComponent} from './pages/anonymous-page/anonymous-page.component';
import {SuccessPageComponent} from './pages/success-page/success-page.component';
import {ErrorPageComponent} from './pages/error-page/error-page.component';
import {PersonalizedPageComponent} from './pages/personalized-page/personalized-page.component';
import { UpdatePersonalizedPageComponent } from './pages/update-personalized-page/update-personalized-page.component';
import { UpdateWithAngularSyntaxPersonalizedPageComponent } from './pages/update-with-angular-syntax-personalized-page/update-with-angular-syntax-personalized-page.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'registration', component: AnonymousPageComponent },
  { path: 'personalized', component: PersonalizedPageComponent},
  { path: 'update-info-xmpl', component: UpdatePersonalizedPageComponent },
  { path: 'update-info-angular', component: UpdateWithAngularSyntaxPersonalizedPageComponent },
  { path: 'update-info-js-xmpl', component: UpdateInfoJsXmplComponent },
  { path: 'success', component: SuccessPageComponent},
  { path: 'error', component: ErrorPageComponent},
  { path: 'login', component: LoginPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
