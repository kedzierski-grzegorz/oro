import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginService} from "./services/login.service";
import {AdminService} from "./services/admin.service";
import {UsersService} from "./services/users.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth-interceptor";
import {SimpleNotificationsModule} from "angular2-notifications";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';
import { AdminUserEditComponent } from './pages/admin-user-edit/admin-user-edit.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MyAccountComponent,
    AdminUsersComponent,
    AdminUserEditComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SimpleNotificationsModule.forRoot(),
    HttpClientModule,
    SimpleNotificationsModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    LoginService,
    AdminService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
