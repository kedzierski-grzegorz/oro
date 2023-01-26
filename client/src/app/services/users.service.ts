import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Page} from "../models/page.model";
import {User} from "../models/user.model";
import {environment} from "../environments/environment";
import {map} from "rxjs";

@Injectable({providedIn: 'root'})
export class UsersService {
  constructor(
    private http: HttpClient,
  ) {
  }

  async getMyData(): Promise<User> {
    return this.http.get<User>(
      environment.apiUrl + '/users/me',
    )
      .pipe(map(s => Object.setPrototypeOf(s, User.prototype)))
      .toPromise();
  }

  async updateMe(user: User): Promise<void> {
    return this.http.put<void>(
      environment.apiUrl + '/users/me',
      user
    ).toPromise();
  }
}
