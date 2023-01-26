import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {LoginService} from "../services/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const sessionData = this.loginService.sessionData;
    if (sessionData) {
      request = request.clone({
        setHeaders: { Authorization: sessionData.token }
      });
    }

    return next.handle(request);
  }
}
