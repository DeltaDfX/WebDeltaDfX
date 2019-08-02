import {Stakeholder} from '../model/stakeholder';

export class SurveyRespondent {
    senderID: number;
    senderName: string;
    respondent: Stakeholder[];

    constructor(senderID: number, senderName: string, respondent: Stakeholder[]) {
        this.senderID = senderID;
        this.senderName = senderName;
        this.respondent = respondent;
    }
}
