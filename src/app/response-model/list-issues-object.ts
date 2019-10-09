export class ListIssuesObject {
    id: number;
    issue: string;
    title: string;
    averageRating: number;

    constructor(id: number, issue: string, title: string, averageRating: number) {
        this.id = id;
        this.issue = issue;
        this.title = title;
        this.averageRating = averageRating;
    }
}
