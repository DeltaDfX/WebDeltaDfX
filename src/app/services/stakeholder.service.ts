import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Organization} from '../model/organization';
import {ConstantService} from '../constant/constant-service';
import {BusinessUnit} from '../model/business-unit';
import {Stakeholder} from '../model/stakeholder';
import {GroupStakeholder} from '../model/group-stakeholder';
import {Survey} from '../model/survey';

const httpHeaders = new HttpHeaders(
    {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa('user:123456')
    });


@Injectable({
    providedIn: 'root'
})
export class StakeholderService {
    constructor(private http: HttpClient,
                private constantService: ConstantService) {
    }

    // GET organizations from the server
    getOrganizations(country: string): Observable<Organization[]> {
        return this.http.get<Organization[]>(this.constantService.GET_ORGANIZATIONS + country, this.constantService.HTTPOPTION).pipe(
            tap(_ => console.log(`fetched organization with country ${country}`)),
            catchError(this.handleError<Organization[]>(`get Organizations country=${country}`))
        );
    }

    getBusinessUnits(organizationID: number, divisionID: number): Observable<BusinessUnit[]> {
        return this.http.get<BusinessUnit[]>(`${this.constantService.GET_BUSINESSUNITS}organizationID=${organizationID}&divisionID=${divisionID}`, this.constantService.HTTPOPTION)
            .pipe(
                tap(_ => console.log(`fetched business unit with organization id ${organizationID} & division id ${divisionID}`)),
                catchError(this.handleError<BusinessUnit[]>(`get list business organization id ${organizationID} & division id ${divisionID}`))
            );
    }

    getStakeholders(businessUnitID: number): Observable<Stakeholder[]> {
        return this.http.get<Stakeholder[]>(`${this.constantService.GET_STAKEHOLDERS}${businessUnitID}`, this.constantService.HTTPOPTION).pipe(
            tap(_ => console.log(`fetched stakeholder with business unit id ${businessUnitID}`)),
            catchError(this.handleError<Stakeholder[]>(`get list stakeholders business unit id ${businessUnitID}`))
        );
    }

    updateStakeholder(stackHolder: Stakeholder): Observable<Stakeholder> {
        return this.http.post<Stakeholder>(this.constantService.UPDATE_STAKEHOLDER, stackHolder, this.constantService.HTTPOPTION).pipe(
            tap(_ => console.log(`Updated stakeholder with ${stackHolder}`)),
            catchError(this.handleError<Stakeholder>(`Update stakeholder ${stackHolder}`))
        );
    }

    getGroupStakeholders(): Observable<GroupStakeholder[]> {
        return this.http.get<GroupStakeholder[]>(this.constantService.GET_GROUPSTAKEHOLDER)
            .pipe(
                tap(_ => console.log(`fetched group stakeholder`)),
                catchError(this.handleError<GroupStakeholder[]>(`get list group stakeholder`))
            );
    }

    insertStakeholder(stakeholder: Stakeholder): Observable<Stakeholder> {
        return this.http.post<Stakeholder>(this.constantService.ADD_STAKEHOLDER, stakeholder, this.constantService.HTTPOPTION)
            .pipe(
                tap(_ => console.log(`Add a stakeholder`)),
                catchError(this.handleError<Stakeholder>(`Add a stakeholder`))
            );
    }

    deleteStakeholder(stakeholder: Stakeholder): Observable<boolean> {
        return this.http.post<boolean>(this.constantService.DELETE_STAKEHOLDER, stakeholder, this.constantService.HTTPOPTION)
            .pipe(
                tap(_ => console.log(`Delete a stakeholder`)),
                catchError(this.handleError<boolean>(`Delete a stakeholder`))
            );
    }

    getStakeholdersByGroup(groupID: number): Observable<Stakeholder[]> {
        return this.http.get<Stakeholder[]>(`${this.constantService.GET_STAKEHOLDERSBYGROUP}${groupID}`, this.constantService.HTTPOPTION).pipe(
            tap(_ => console.log(`fetched stakeholder with business unit id ${groupID}`)),
            catchError(this.handleError<Stakeholder[]>(`get list stakeholders business unit id ${groupID}`))
        );
    }

    getSurveys(): Observable<Survey[]> {
        return this.http.get<Survey[]>(`${this.constantService.GET_SURVEYS}`, this.constantService.HTTPOPTION).pipe(
            tap(_ => console.log(`fetched list surveys`)),
            catchError(this.handleError<Survey[]>(`get list surveys`))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

}
