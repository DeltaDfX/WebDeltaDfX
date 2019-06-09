import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class ConstantService {
    API_ENDPOINT: string;
    USER: string;
    USER_AUTHENTICATION: string;
    GET_ORGANIZATIONS: string;
    GET_BUSINESSUNITS: string;
    GET_STAKEHOLDERS: string;
    GET_GROUPSTAKEHOLDER: string;
    UPDATE_STAKEHOLDER: string;
    ADD_STAKEHOLDER: string;
    ADD_STAKEHOLDERS: string;
    DELETE_STAKEHOLDER: string;
    GET_STAKEHOLDERSBYGROUP: string;
    GET_LIST_SURVEYS: string;
    GET_SURVEY: string;
    SEND_SURVEY_MAIL: string;
    GET_FULLGROUPSTAKEHOLDERS: string;
    SEND_SURVEY: string;

    // Contructor
    constructor() {
        // this.API_ENDPOINT = 'http://localhost:8081/'
        // this.API_ENDPOINT = 'https://customer-survey-restapi.herokuapp.com/'
        this.USER = 'users';
        this.USER_AUTHENTICATION = this.API_ENDPOINT + 'login';
        this.GET_ORGANIZATIONS = this.API_ENDPOINT + 'api/organizations?country=';
        this.GET_BUSINESSUNITS = this.API_ENDPOINT + 'api/units?';
        this.GET_STAKEHOLDERS = this.API_ENDPOINT + 'api/stakeholders?unitID=';
        this.UPDATE_STAKEHOLDER = this.API_ENDPOINT + 'api/update-stakeholder';
        this.GET_GROUPSTAKEHOLDER = this.API_ENDPOINT + 'api/group-stakeholders';
        this.ADD_STAKEHOLDER = this.API_ENDPOINT + 'api/add-stakeholder';
        this.ADD_STAKEHOLDERS = this.API_ENDPOINT + 'api/add-stakeholders';
        this.DELETE_STAKEHOLDER = this.API_ENDPOINT + 'api/delete-stakeholder';
        this.GET_STAKEHOLDERSBYGROUP = this.API_ENDPOINT + 'api/stakeholdersByGroup?group=';
        this.GET_LIST_SURVEYS = this.API_ENDPOINT + 'api/surveys';
        this.SEND_SURVEY_MAIL = this.API_ENDPOINT + 'api/send-survey-mail';
        this.GET_FULLGROUPSTAKEHOLDERS = this.API_ENDPOINT + 'api/getFullGroupStakeholder';
        this.GET_SURVEY = this.API_ENDPOINT + 'api/getSurvey';
        this.SEND_SURVEY = this.API_ENDPOINT + 'api/sendSurvey';
    }
}
