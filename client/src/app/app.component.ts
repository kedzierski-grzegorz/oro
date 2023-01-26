import {AfterViewInit, Component, OnInit} from '@angular/core';
import {LoginService} from "./services/login.service";
import {AdminService} from "./services/admin.service";
import {UsersService} from "./services/users.service";
import {NotificationsService} from "angular2-notifications";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {LoadingSpinnerComponent} from "./components/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  isNavbarVisible = false;

  constructor(
    private readonly router: Router,
    private readonly loginService: LoginService,
  ) {
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.isNavbarVisible = e.url !== '/login' && e.url !== '/register';
      }
    })
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  async logout(): Promise<void> {
    LoadingSpinnerComponent.show();

    try {
      await this.loginService.logout();
      this.router.navigate(['/login']);
    } catch (e) {
      console.error(e);
    }

    LoadingSpinnerComponent.hide();
  }
}
