import {Category} from './category';

export class Issue {
    id: number;
    issue: string;
    categoryQuestion: Category[];

    constructor(id: number, issue: string, categoryQuestion: Category[]) {
        this.id = id;
        this.issue = issue;
        this.categoryQuestion = categoryQuestion;
    }
}
