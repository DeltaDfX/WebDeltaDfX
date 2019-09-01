import {Question} from './question';

export class Category {
    private _id: number;
    private _title: string;
    private _questions: Question[];
    private _rating: number;
    private _subtitle: string;
    private _type: string;
    private _typeValue: number;

    constructor(id: number, title: string, questions: Question[], rating: number, subtitle: string, type: string, typeValue: number) {
        this._id = id;
        this._title = title;
        this._questions = questions;
        this._rating = rating;
        this._subtitle = subtitle;
        this._type = type;
        this._typeValue = typeValue;
    }

  get subtitle(): string {
    return this._subtitle;
  }

  set subtitle(value: string) {
    this._subtitle = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get typeValue(): number {
    return this._typeValue;
  }

  set typeValue(value: number) {
    this._typeValue = value;
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
