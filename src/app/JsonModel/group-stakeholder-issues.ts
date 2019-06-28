import {Category} from '../model/category';

export class GroupStakeholderIssues {
    groupName: string;
    groupID: number;
    categories: Category[];

    constructor(name: string, id: number, categories: Category[]) {
        this.groupName = name;
        this.groupID = id;
        this.categories = categories;
    }
}
