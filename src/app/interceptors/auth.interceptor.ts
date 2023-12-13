import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor( private router: Router, private authService : AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      headers : this.authService.getUser().token ? request.headers.set("Authorization" , "Bearer " + this.authService.getUser().token) : request.headers
    });
    return next.handle(req).pipe(catchError(x => this.handleError(x)));
  }

  private handleError(err: HttpErrorResponse) {
    if (err.status === 401 || err.status === 403) {
      this.authService.clearUser();
      this.router.navigateByUrl("/login")
    }
    return throwError(() => err);
  }
}
