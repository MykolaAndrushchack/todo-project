import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {TodosComponent} from './components/todos/todos.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IdentityService} from './services/identity.service';
import {HttpClientModule} from '@angular/common/http';
import {TodosService} from './services/todos.service';
import {AuthGuard} from './guards/auth.guard';
import {RegisterGuard} from './guards/register.guard';
import {PhoneMaskDirective} from './directives/phone-mask.directive';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    TodosComponent,
    PhoneMaskDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    IdentityService,
    TodosService,
    AuthGuard,
    RegisterGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
