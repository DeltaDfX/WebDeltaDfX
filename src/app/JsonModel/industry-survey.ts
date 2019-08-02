import {SurveyRespondent} from './survey-respondent';

export class IndustrySurvey {
    id: number;
    name: string;
    surveys: SurveyRespondent[];

    constructor(id: number, name: string, surveys: SurveyRespondent[]) {
        this.id = id;
        this.name = name;
        this.surveys = surveys;
    }
}
