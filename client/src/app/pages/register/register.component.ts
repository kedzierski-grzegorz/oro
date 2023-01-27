import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormHelpersService} from "../../services/form-helpers.service";
import {NotificationsService} from "angular2-notifications";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {LoadingSpinnerComponent} from "../../components/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

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
    await this.signUp();
  }

  async signUp(): Promise<void> {
    LoadingSpinnerComponent.show();
    try {
      await this.loginService.signUp(this.email, this.password);
      this.notifications.success('Register successful', null, {timeOut: 2000});
      setTimeout(() => {
        this.router.navigate(['/app']);
      }, 500);
    } catch (e) {
      this.notifications.error(e.error?.message ?? 'Register failed');
      console.error(e);
    }
    LoadingSpinnerComponent.hide();
  }
}
