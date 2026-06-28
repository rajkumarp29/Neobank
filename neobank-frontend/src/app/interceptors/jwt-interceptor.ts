import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const isAuthApi =
      request.url.includes('/api/auth/login') ||
      request.url.includes('/api/auth/register');

    if (isAuthApi) {
      return next.handle(request);
    }

    const token = localStorage.getItem('token');

    if (!token) {
      return next.handle(request);
    }

    const authReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(authReq);
  }
}