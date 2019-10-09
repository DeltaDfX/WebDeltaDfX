export interface Receiver {
    id: number;
}

export class SendSurveyObject {
    senderID: number;
    surveyID: number;
    receivers: Receiver[] = [];

    constructor(senderID: number, surveyID: number, receivers: Receiver[]) {
        this.senderID = senderID;
        this.surveyID = surveyID;
        this.receivers = receivers;
    }
}
