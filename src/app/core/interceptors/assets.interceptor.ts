import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AssetsInterceptor implements HttpInterceptor {

  constructor() {}

  /**
   * Method used to intercept the http query and remove the prefix (/api/) used for other pages navigation
   * @param req
   * @param next
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newUrl = req.url.includes('assets/i18n') ? req.url.replace('/api', '') : req.url;
    req = req.clone({
      url: newUrl
    });

    return next.handle(req);
  }
}
