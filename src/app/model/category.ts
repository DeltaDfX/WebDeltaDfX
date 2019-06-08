import {Question} from './question';

export class Category {
    id: number;
    title: string;
    questions: Question[];
    rating: number;

    constructor(id: number, title: string, questions: Question[], rating: number) {
        this.id = id;
        this.title = title;
        this.questions = questions;
        this.rating = rating;
    }
}
