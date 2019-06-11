import {Question} from './question';

export class Category {
    private _id: number;
    private _title: string;
    private _questions: Question[];
    private _rating: number;

    constructor(id: number, title: string, questions: Question[], rating: number) {
        this._id = id;
        this._title = title;
        this._questions = questions;
        this._rating = rating;
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get questions(): Question[] {
        return this._questions;
    }

    set questions(value: Question[]) {
        this._questions = value;
    }

    get rating(): number {
        return this._rating;
    }

    set rating(value: number) {
        this._rating = value;
    }
}
