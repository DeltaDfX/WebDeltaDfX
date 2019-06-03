import {Stakeholder} from './stakeholder';
import {Survey} from './survey';
import {GroupStakeholder} from './group-stakeholder';

export class SurveyStakeholder {
    stakeholders: Stakeholder[] = [];
    survey: Survey;
    groupStakeholders: GroupStakeholder[] = [];

    constructor(groupStakeholders: GroupStakeholder[], stakeholders: Stakeholder[], survey: Survey) {
        this.stakeholders = stakeholders;
        this.survey = survey;
        this.groupStakeholders = groupStakeholders;
    }
}
