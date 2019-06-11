import {Category} from '../model/category';

export class GroupStakeholderIssues {
    name: string;
    id: number;
    categories: Category[];

    constructor(name: string, id: number, categories: Category[]) {
        this.name = name;
        this.id = id;
        this.categories = categories;
    }
}
