import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ConstantService} from '../constant/constant-service';
import {catchError, map} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {Stakeholder} from '../model/stakeholder';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    model: any = {};

    constructor(private http: HttpClient,
                private constantService: ConstantService,
                private router: Router) {
    }

    public getAuthentication(email: string, password: string): Observable<Stakeholder> {
        return this.http.post<Stakeholder>(this.constantService.USER_AUTHENTICATION, {
            email,
            password
        }).pipe(
            catchError(this.handleError)
        );
    }

    public createNewMember(data: any): Observable<boolean> {
        return this.http.post<boolean>(this.constantService.SIGN_UP, data).pipe(
            catchError(this.handleError)
        );
    }

    private handleError<T>(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }
}
