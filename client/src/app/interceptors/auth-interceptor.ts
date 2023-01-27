import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../environments/environment";
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const sessionData = this.loginService.sessionData;
    if (sessionData) {
      request = request.clone({
        setHeaders: { Authorization: sessionData.token }
      });
    }

    return next.handle(request)
      .pipe(catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.loginService.logoutLocal();
          this.router.navigate(['/login']);
        }
        return throwError(error);
      }));
  }
}
