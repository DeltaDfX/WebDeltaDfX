import {Issue} from './issue';

export class SurveyDetails {
    id: number;
    description: string;
    issues: Issue[];

    constructor(id: number, description: string, issues: Issue[]) {
        this.id = id;
        this.issues = issues;
        this.description = description;
    }
}
