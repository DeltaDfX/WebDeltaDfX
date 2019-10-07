import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConstantService} from '../constant/constant-service';
import {Survey} from '../model/survey';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Stakeholder} from '../model/stakeholder';
import {Receiver, SendSurveyObject} from '../JsonModel/send-survey-object';
import {SurveyDetails} from '../model/survey-details';
import {TopBottomIssues} from '../JsonModel/top-bottom-issues';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient,
              private constantService: ConstantService,
              private userService: UserService) {
  }

  sendSurveyToSelectedGroup(survey: Survey, receivers: Stakeholder[]): Observable<boolean> {
    const receiversJSON: {
      id: number
    }[] = [];
    receivers.forEach(receiver => {
      const receiverID: Receiver = {
        id: receiver.id
      };
      receiversJSON.push(receiverID);
    });
    const sender: Stakeholder = JSON.parse(localStorage.getItem('currentUser'));
    const objectToSend = new SendSurveyObject(sender.id, survey.id, receiversJSON);
    return this.http.post<boolean>(this.constantService.SEND_SURVEY_MAIL, objectToSend).pipe(
      tap(_ => console.log(`Send survey to list stakeholders`)),
      catchError(this.handleError<boolean>(`Post list stakeholders to send email`))
    );
  }

  getSurvey(surveyID: number, companyName: string): Observable<SurveyDetails> {
    const json = {
      surveyID,
      companyName
    };
    return this.http.post<SurveyDetails>(this.constantService.GET_SURVEY, json).pipe(
      tap(_ => console.log(`Get survey`)),
      catchError(this.handleError<SurveyDetails>(`Get survey`))
    );
  }

  getSurveys(): Observable<Survey[]> {
    return this.http.post<Survey[]>(`${this.constantService.GET_LIST_SURVEYS}`, this.userService.getTokenAuth()).pipe(
      tap(_ => console.log(`fetched list surveys`)),
      catchError(this.handleError<Survey[]>(`get list surveys`))
    );
  }

  sendSurveyResult(surveyDetails: SurveyDetails, receiver: number, sender: number): Observable<boolean> {
    const json = {
      surveyID: surveyDetails.id,
      receiver,
      issues: surveyDetails.issues,
      sender
    };
    return this.http.post<boolean>(this.constantService.SEND_SURVEY, json).pipe(
      tap(_ => console.log(`Send survey`)),
      catchError(this.handleError<boolean>(`Send survey`))
    );
  }

  createSurvey(data: any): Observable<boolean> {
    const json = JSON.stringify(data);
    return this.http.post<boolean>(this.constantService.CREATE_SURVEY, json).pipe(
      tap(_ => console.log(`Create survey`)),
      catchError(this.handleError<boolean>(`Create survey`))
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

  getTopBottomIssue(groupIDs: number[], quantity: number): Observable<TopBottomIssues> {
    return this.http.get<TopBottomIssues>(this.constantService.GET_LIST_ISSUE_TOPBOTTOM + `groupID=${groupIDs}`
      + `&quantity=${quantity}`).pipe(
      tap(_ => console.log(`Get list top bottom issue`)),
      catchError(this.handleError<TopBottomIssues>(`Get list top bottom issue`))
    );
  }

  getIssuesOfGroups(groupIDs: number[], quantity: number): Observable<any> {
    return this.http.get<any>(this.constantService.GET_ISSUES_BY_GROUP + `groupID=${groupIDs} + &quantity=${quantity}`).pipe(
      tap(_ => console.log(`Get issues by group`)),
      catchError(this.handleError<any>(`Get issues by group`))
    );
  }

  getIssues(groupIDs: number[], quantity: number): Observable<any> {
    return this.http.get<any>(this.constantService.GET_ISSUES + `groupID=${groupIDs} + &quantity=${quantity}`).pipe(
      tap(_ => console.log(`Get issues by group`)),
      catchError(this.handleError<any>(`Get issues by group`))
    );
  }

  deleteSurvey(survey: Survey): Observable<boolean> {
    const json = {
      surveyID: survey.id,
      auth: this.userService.getTokenAuth()
    }
    return this.http.post<boolean>(this.constantService.DELETE_SURVEY, json).pipe(
      tap(_ => console.log(`Get issues by group`)),
      catchError(this.handleError<any>(`Get issues by group`))
    );
  }

  updateSurvey(data: any): Observable<boolean> {
    const jsonSurvey = JSON.stringify(data);
    const json = {
      survey: data,
      auth: this.userService.getTokenAuth()
    };
    return this.http.post<boolean>(this.constantService.UPDATE_SURVEY, json).pipe(
      tap(_ => console.log(`Create survey`)),
      catchError(this.handleError<boolean>(`Create survey`))
    );
  }
}
