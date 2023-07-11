import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "./services/auth.service";

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.authService.getToken() || "";
    if (request.url.indexOf("/vk-api") != 0)
      request = request.clone({
        setHeaders: {
          "Authorization": "Bearer " + authToken
        }
      });
    return next.handle(request);
  }
}
