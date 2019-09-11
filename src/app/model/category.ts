import {Question} from './question';

export class Category {
  id: number;
  title: string;
  questions: Question[];
  rating: number;
  subtitle: string;
  type: string;
  typeValue: number;

  constructor(id: number, title: string, questions: Question[], rating: number, subtitle: string, type: string, typeValue: number) {
    this.id = id;
    this.title = title;
    this.questions = questions;
    this.rating = rating;
    this.subtitle = subtitle;
    this.type = type;
    this.typeValue = typeValue;
  }
}
