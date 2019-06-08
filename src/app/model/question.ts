export class Question {
    id: number;
    question: string;
    rating: number;


    constructor(id: number, question: string, rating: number) {
        this.id = id;
        this.question = question;
        this.rating = rating;
    }
}
