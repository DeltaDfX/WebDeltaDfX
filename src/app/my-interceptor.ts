import {Injectable} from '@angular/core';
import {catchError, map, tap} from 'rxjs/operators';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpResponse, HttpInterceptor, HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {ErrorDialogService} from './services/HandleServiceError/error-dialog.service';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
    constructor(private  errorDialogService: ErrorDialogService) {
    }

    // function which will be called for all http calls
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        console.log('intercepted request ... ');
        if (!request.headers.has('Content-Type')) {
            // request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }
        request = request.clone({
            setHeaders: {
                Accept: 'application/json',
                Authorization: `Basic ${btoa('user:123456')}`
            }});

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                }
                return event;
            }),
            catchError(
                (error: HttpErrorResponse) => {
                    let data = {};
                    data = {
                        reason: error && error.error.reason ? error.error.reason : '',
                        status: error.status
                    };
                    this.errorDialogService.openDialog(data);
                    return throwError(error.message);
                }
            ));
    }
}

