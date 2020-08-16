import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    public toastrService: ToastrService,
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 409) {
            this.toastrService.error(error.error, '');
          } else if (error.status === 401) {
            this.toastrService.error('Please contact to administrator', 'Unauthorized');
          } else {
            this.toastrService.error('Something was not right. Please try again.', 'Server is not Responding');
          }
          return throwError(error);
        })
      );
  }
}
