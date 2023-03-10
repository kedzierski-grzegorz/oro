import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {MyAccountComponent} from "./pages/my-account/my-account.component";
import {AdminUsersComponent} from "./pages/admin-users/admin-users.component";
import {AdminUserEditComponent} from "./pages/admin-user-edit/admin-user-edit.component";
import {AuthGuard} from "./guards/auth.guard";
import {RoleGuard} from "./guards/role.guard";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'app',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'my-account',
        component: MyAccountComponent,
      },
      {
        path: 'users',
        canActivate: [RoleGuard],
        component: AdminUsersComponent,
      },
      {
        path: 'users/:id',
        canActivate: [RoleGuard],
        component: AdminUserEditComponent
      },
      {
        path: '**',
        redirectTo: 'my-account'
      }
    ],
  },
  {
    path: '**',
    redirectTo: 'app'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
