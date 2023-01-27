import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from "../../models/user.model";
import {ActivatedRoute} from "@angular/router";
import {NotificationsService} from "angular2-notifications";
import {LoginService} from "../../services/login.service";
import {AdminService} from "../../services/admin.service";
import {FormHelpersService} from "../../services/form-helpers.service";
import {UsersService} from "../../services/users.service";
import {LoadingSpinnerComponent} from "../../components/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit{
  user: User = new User();

  @ViewChild('form') form: ElementRef<HTMLFormElement>;

  constructor(
    private route: ActivatedRoute,
    private notifications: NotificationsService,
    private loginService: LoginService,
    private usersService: UsersService,
    private fh: FormHelpersService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(): Promise<void> {
    LoadingSpinnerComponent.show();

    try {
      this.user = await this.usersService.getMyData();
    } catch (e) {
      this.notifications.error('Error', e.error?.message ?? 'Cannot get user data');
      console.error(e);
    }

    LoadingSpinnerComponent.hide();
  }

  async save(): Promise<void> {
    this.fh.validateForm(this.form.nativeElement);

    LoadingSpinnerComponent.show();

    try {
      await this.usersService.updateMe(this.user);
      this.notifications.success('Success', 'Your data updated', {timeOut: 3000});
    } catch (e) {
      this.notifications.error('Error', e.error?.message ?? 'Cannot update your data');
      console.error(e);
    }

    LoadingSpinnerComponent.hide();
  }
}
