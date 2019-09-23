import {Issue} from './issue';

export class Survey {
    id: number;
    title: string;
    description: string;
    issues: Issue[];

    constructor(id: number, name: string, description: string, issues: Issue[]) {
        this.id = id;
        this.title = name;
        this.description = description;
        this.issues = issues;
    }
}
