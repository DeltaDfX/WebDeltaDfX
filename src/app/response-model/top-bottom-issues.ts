import {ListIssuesObject} from './list-issues-object';

export class TopBottomIssues {
    top: ListIssuesObject[];
    bottom: ListIssuesObject[];

    constructor(top: ListIssuesObject[], bottom: ListIssuesObject[]) {
        this.top = top;
        this.bottom = bottom;
    }
}
