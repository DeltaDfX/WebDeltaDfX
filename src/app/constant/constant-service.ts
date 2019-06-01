import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class ConstantService {
    HTTPOPTION = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + btoa('user:123456')
        })
    };
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
    GET_SURVEYS: string;

    // Contructor
    constructor() {
        this.API_ENDPOINT = 'http://localhost:8081/'
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
        this.GET_SURVEYS = this.API_ENDPOINT + 'api/surveys';
    }
}
