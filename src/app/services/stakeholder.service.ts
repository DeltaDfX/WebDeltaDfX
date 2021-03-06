import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Organization} from '../model/organization';
import {ConstantService} from '../constant/constant-service';
import {BusinessUnit} from '../model/business-unit';
import {Stakeholder} from '../model/stakeholder';
import {GroupStakeholder} from '../model/group-stakeholder';
import {Survey} from '../model/survey';
import {JSGroupStakeholder} from '../response-model/jsgroup-stakeholder';
import {CountryIndustry} from '../response-model/country-industry';
import {Industry} from '../model/industry';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class StakeholderService {
  constructor(private http: HttpClient,
              private constantService: ConstantService, private userService: UserService) {
  }

  // GET organizations from the server
  getOrganizations(country: string): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.constantService.GET_ORGANIZATIONS + country).pipe(
      tap(_ => console.log(`fetched organization with country ${country}`)),
      catchError(this.handleError<Organization[]>(`get Organizations country=${country}`))
    );
  }

  getBusinessUnitsBy(organizationID: number, industryID: number): Observable<BusinessUnit[]> {
    return this.http.get<BusinessUnit[]>
    (`${this.constantService.GET_BUSINESSUNITS_BY}organizationID=${organizationID}&industryID=${industryID}`).pipe(
      tap(_ => console.log(`fetched business unit with organization id ${organizationID} & industry id ${industryID}`)),
      catchError(this.handleError<BusinessUnit[]>(`get list business organization id ${organizationID} & industry id ${industryID}`))
    );
  }

  getStakeholders(businessUnitID: number): Observable<Stakeholder[]> {
    return this.http.get<Stakeholder[]>(`${this.constantService.GET_STAKEHOLDERS}${businessUnitID}`).pipe(
      tap(_ => console.log(`fetched stakeholder with business unit id ${businessUnitID}`)),
      catchError(this.handleError<Stakeholder[]>(`get list stakeholders business unit id ${businessUnitID}`))
    );
  }

  updateStakeholder(stackHolder: Stakeholder): Observable<Stakeholder> {
    return this.http.post<Stakeholder>(this.constantService.UPDATE_STAKEHOLDER, stackHolder).pipe(
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
    return this.http.post<Stakeholder>(this.constantService.ADD_STAKEHOLDER, stakeholder)
      .pipe(
        tap(_ => console.log(`Add a stakeholder`)),
        catchError(this.handleError<Stakeholder>(`Add a stakeholder`))
      );
  }

  deleteStakeholder(stakeholder: Stakeholder): Observable<boolean> {
    return this.http.post<boolean>(this.constantService.DELETE_STAKEHOLDER, stakeholder)
      .pipe(
        tap(_ => console.log(`Delete a stakeholder`)),
        catchError(this.handleError<boolean>(`Delete a stakeholder`))
      );
  }

  getStakeholdersByGroup(groupID: number): Observable<Stakeholder[]> {
    return this.http.get<Stakeholder[]>(`${this.constantService.GET_STAKEHOLDERSBYGROUP}${groupID}`).pipe(
      tap(_ => console.log(`fetched stakeholder with business unit id ${groupID}`)),
      catchError(this.handleError<Stakeholder[]>(`get list stakeholders business unit id ${groupID}`))
    );
  }

  getSurveys(): Observable<Survey[]> {
    return this.http.get<Survey[]>(`${this.constantService.GET_LIST_SURVEYS}`).pipe(
      tap(_ => console.log(`fetched list surveys`)),
      catchError(this.handleError<Survey[]>(`get list surveys`))
    );
  }

  getGroupStakeholdersAndStakeholders(): Observable<JSGroupStakeholder[]> {
    return this.http.get<JSGroupStakeholder[]>(this.constantService.GET_FULLGROUPSTAKEHOLDERS).pipe(
      tap(_ => console.log(`fetched detail group stakeholder`)),
      catchError(this.handleError<JSGroupStakeholder[]>(`get list detail group stakeholder`))
    );
  }

  getListBussinessUnits(): Observable<BusinessUnit[]> {
    return this.http.get<BusinessUnit[]>(this.constantService.GET_BUSINESSUNITS).pipe(
      tap(_ => console.log('fetched list business unit')),
      catchError(this.handleError<BusinessUnit[]>('get list business unit'))
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

  downloadTemplateStakeholder(): Observable<Blob> {
    return this.http.get(this.constantService.DOWNLOAD_TEMPLATE_STAKEHOLDER_EXCEL, {responseType: 'blob'}).pipe(
      tap(_ => console.log('Download file stakeholder template')),
      catchError(this.handleError<Blob>('Download file stakeholder template'))
    );
  }

  importfileStakeholder(data: any): Observable<any> {
    return this.http.post<any>(this.constantService.UPLOAD_STAKEHOLDERLIST, data, {reportProgress: true, observe: 'events'}).pipe(
      tap(_ => console.log('Import list stakeholder')),
      catchError(this.handleError<any>('Upload file has been not successful yet')),
      map((event) => {

        switch (event.type) {

          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * event.loaded / event.total);
            return {status: 'progress', message: progress};

          case HttpEventType.Response:
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
        }
      })
    );
  }

  getListCountryIndustry(): Observable<CountryIndustry[]> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) as Stakeholder;
    return this.http.get<CountryIndustry[]>(this.constantService.GET_LIST_COUNTRIES_OF_ORGANIZATION + currentUser.id).pipe(
      tap(_ => console.log('Get list country-industry-survey')),
      catchError(this.handleError<CountryIndustry[]>('Get list country-industry-survey'))
    );
  }

  getIndustries(): Observable<Industry[]> {
    return this.http.post<Industry[]>(this.constantService.GET_INDUSTRIES, this.userService.getTokenAuth()).pipe(
      tap(_ => console.log('Get list industries')),
      catchError(this.handleError<Industry[]>('Get list industries'))
    );
  }
}
