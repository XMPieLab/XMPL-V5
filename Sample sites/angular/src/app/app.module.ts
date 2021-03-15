import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnonymousPageComponent } from './pages/anonymous-page/anonymous-page.component';
import { SuccessPageComponent } from './pages/success-page/success-page.component';
import {CommonModule} from '@angular/common';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import {PersonalizedPageComponent} from './pages/personalized-page/personalized-page.component';
import { UpdatePersonalizedPageComponent } from './pages/update-personalized-page/update-personalized-page.component';
import { UpdateWithAngularSyntaxPersonalizedPageComponent } from './pages/update-with-angular-syntax-personalized-page/update-with-angular-syntax-personalized-page.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { UpdateInfoJsXmplComponent } from './pages/update-info-js-xmpl/update-info-js-xmpl.component';

@NgModule({
  declarations: [
    AppComponent,
    AnonymousPageComponent,
    SuccessPageComponent,
    ErrorPageComponent,
    PersonalizedPageComponent,
    UpdatePersonalizedPageComponent,
    UpdateWithAngularSyntaxPersonalizedPageComponent,
    WelcomeComponent,
    UpdateInfoJsXmplComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
