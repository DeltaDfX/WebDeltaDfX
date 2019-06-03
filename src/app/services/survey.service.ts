import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConstantService} from '../constant/constant-service';
import {GroupStakeholder} from '../model/group-stakeholder';
import {Survey} from '../model/survey';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {SurveyStakeholder} from '../model/survey-stakeholder';
import {Stakeholder} from '../model/stakeholder';
import {forEach} from '@angular/router/src/utils/collection';
import {Receiver, SendSurveyObject} from '../JsonModel/send-survey-object';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient,
              private constantService: ConstantService) {
  }

  sendSurveyToSelectedGroup(survey: Survey, receivers: Stakeholder[]): Observable<boolean> {
    const receiversJSON: {
      id: number
    }[] = [];
    receivers.forEach( receiver => {
      const receiverID: Receiver = {
        id: receiver.id
      };
      receiversJSON.push(receiverID);
    });
    const sender: Stakeholder = JSON.parse(localStorage.getItem('currentUser'));
    const objectToSend = new SendSurveyObject(sender.id, survey.id, receiversJSON);
    return this.http.post<boolean>(this.constantService.SEND_SURVEY, objectToSend).pipe(
        tap(_ => console.log(`Send survey to list stakeholders`)),
        catchError(this.handleError<boolean>(`Post list stakeholders to send email`))
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
