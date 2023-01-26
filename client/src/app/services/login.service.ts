import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserSession} from "../models/user-session.model";
import {environment} from "../environments/environment";
import {map} from "rxjs";

@Injectable({providedIn: 'root'})
export class LoginService {

  get sessionData(): UserSession | null {
    const session = localStorage.getItem(this.localStorageKey);
    if (session) {
      return Object.setPrototypeOf(JSON.parse(session), UserSession.prototype);
    } else {
      return null;
    }
  }
  private localStorageKey = 'session-data';

  constructor(
    private http: HttpClient,
  ) {
  }

  async login(email: string, password: string): Promise<UserSession> {
    return this.http.post<UserSession>(
      environment.apiUrl + '/login',
      {
        email: email,
        password: password
      }
    )
      .pipe(map(s => {
        const session = Object.setPrototypeOf(s, UserSession.prototype);
        localStorage.setItem(this.localStorageKey, JSON.stringify(session));
        return session;
      }))
      .toPromise();
  }

  async logout(): Promise<void> {
    await this.http.post<void>(
      environment.apiUrl + '/logout',
      {}
    )
      .toPromise();
    this.logoutLocal();
  }

  logoutLocal(): void {
    localStorage.removeItem(this.localStorageKey);
  }

  async signUp(email: string, password: string): Promise<UserSession> {
    return this.http.post<UserSession>(
      environment.apiUrl + '/sign-up',
      {
        email: email,
        password: password
      }
    )
      .pipe(map(s => {
        const session = Object.setPrototypeOf(s, UserSession.prototype);
        localStorage.setItem(this.localStorageKey, JSON.stringify(session));
        return session;
      }))
      .toPromise();
  }

  isLoggedIn() {
    const sessionData = this.sessionData;
    return sessionData !== null && sessionData.token;
  }
}
