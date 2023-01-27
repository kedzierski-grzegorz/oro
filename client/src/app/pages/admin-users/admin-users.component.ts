import {Component, OnInit} from '@angular/core';
import {NotificationsService} from "angular2-notifications";
import {AdminService} from "../../services/admin.service";
import {Page} from "../../models/page.model";
import {User} from "../../models/user.model";
import {LoadingSpinnerComponent} from "../../components/loading-spinner/loading-spinner.component";
import {UserSession} from "../../models/user-session.model";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  page: Page<User> = new Page<User>();

  loggedUser: UserSession = new UserSession();

  currentPage = 0;

  constructor(
    private readonly notifications: NotificationsService,
    private readonly adminService: AdminService,
    private readonly loginService: LoginService,
  ) {
  }

  ngOnInit(): void {
    this.loggedUser = this.loginService.sessionData as any;
    this.loadData();
  }

  async loadData() {
    LoadingSpinnerComponent.show();
    try {
      this.page = await this.adminService.getUsers(this.currentPage, 10);
    } catch (e) {
      this.notifications.error('Error', e.error?.message ?? 'Cannot get users');
    }
    LoadingSpinnerComponent.hide();
  }

  async previousPage() {
    this.currentPage--;
    if (this.currentPage < 0) {
      this.currentPage = 0;
    }

    await this.loadData();
  }

  async nextPage() {
    this.currentPage++;
    if (this.currentPage >= this.page.totalPages - 1) {
      this.currentPage = this.page.totalPages - 1;
    }

    await this.loadData();
  }

  async deleteUser(userId: number): Promise<void> {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    LoadingSpinnerComponent.show();

    try {
      await this.adminService.deleteUser(userId);
      this.notifications.success('Success', 'User deleted', {timeOut: 3000});
      if (this.page.content.length === 1) {
        await this.previousPage();
      } else {
        await this.loadData();
      }
    } catch (e) {
      this.notifications.error('Error', e.error?.message ?? 'Cannot delete user');
      console.error(e);
    }

    LoadingSpinnerComponent.hide();
  }
}
