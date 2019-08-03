import {Stakeholder} from '../model/stakeholder';

export class SurveyRespondent {
  senderID: number;
  senderName: string;
  respondent: Stakeholder;
  country: string;


  constructor(senderID: number, senderName: string, respondent: Stakeholder, country: string) {
    this.senderID = senderID;
    this.senderName = senderName;
    this.respondent = respondent;
    this.country = country;
  }
}
