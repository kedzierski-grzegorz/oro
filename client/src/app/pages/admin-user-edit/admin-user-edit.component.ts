import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NotificationsService} from "angular2-notifications";
import {AdminService} from "../../services/admin.service";
import {User} from "../../models/user.model";
import {LoadingSpinnerComponent} from "../../components/loading-spinner/loading-spinner.component";
import {FormHelpersService} from "../../services/form-helpers.service";
import {Element} from "@angular/compiler";
import {UserSession} from "../../models/user-session.model";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.css']
})
export class AdminUserEditComponent implements OnInit {

  id = 0;
  user: User = new User();

  loggedUser: UserSession = new UserSession();

  @ViewChild('form') form: ElementRef<HTMLFormElement>;

  constructor(
    private route: ActivatedRoute,
    private notifications: NotificationsService,
    private loginService: LoginService,
    private adminService: AdminService,
    private fh: FormHelpersService
  ) { }

  ngOnInit() {
    this.loggedUser = this.loginService.sessionData as any;
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadData();
  }

  async loadData(): Promise<void> {
    LoadingSpinnerComponent.show();

    try {
      this.user = await this.adminService.getUser(this.id);
      console.log(this.user);
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
      await this.adminService.updateUser(this.user);
      this.notifications.success('Success', 'User data saved', {timeOut: 3000});
    } catch (e) {
      this.notifications.error('Error', e.error?.message ?? 'Cannot save user data');
      console.error(e);
    }

    LoadingSpinnerComponent.hide();
  }
}
