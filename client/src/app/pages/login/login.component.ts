import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormHelpersService} from "../../services/form-helpers.service";
import {NotificationsService} from "angular2-notifications";
import {LoginService} from "../../services/login.service";
import {LoadingSpinnerComponent} from "../../components/loading-spinner/loading-spinner.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string;
  password: string;

  @ViewChild('form') form: ElementRef<HTMLFormElement>;

  constructor(
    private readonly fh: FormHelpersService,
    private readonly notifications: NotificationsService,
    private readonly loginService: LoginService,
    private readonly router: Router
  ) {
  }

  async submit(event: any): Promise<void> {
    event.preventDefault();

    this.fh.validateForm(this.form.nativeElement);
    await this.login();
  }

  async login(): Promise<void> {
    LoadingSpinnerComponent.show();
    try {
      await this.loginService.login(this.email, this.password);
      this.notifications.success('Login successful', null, {timeOut: 2000});
      setTimeout(() => {
        this.router.navigate(['/app']);
      }, 500);
    } catch (e) {
      this.notifications.error('Login failed');
      console.error(e);
    }
    LoadingSpinnerComponent.hide();
  }
}
