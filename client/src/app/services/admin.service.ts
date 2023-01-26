import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Page} from "../models/page.model";
import {User} from "../models/user.model";
import {environment} from "../environments/environment";
import {map} from "rxjs";

@Injectable({providedIn: 'root'})
export class AdminService {

  constructor(
    private http: HttpClient,
  ) {
  }

  async getUsers(page: number, size: number, sort: string = 'sort', desc: boolean = false): Promise<Page<User>> {
    return this.http.get<Page<User>>(
      environment.apiUrl + '/admin/users',
      {
        params: {
          page: page ?? 0,
          size: size ?? 10,
          sort: sort ?? 'email',
          desc: desc ?? false
        }
      }
    )
      .pipe(map(s => Object.setPrototypeOf(s, Page.prototype)))
      .toPromise();
  }

  async updateUser(user: User): Promise<void> {
    return this.http.put<void>(
      environment.apiUrl + '/admin/users/',
      user
    ).toPromise();
  }

}
