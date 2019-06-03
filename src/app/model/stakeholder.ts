import {GroupStakeholder} from './group-stakeholder';

export class Stakeholder {
    id: number;
    name: string;
    email: string;
    phone: string;
    gender: string;
    group: GroupStakeholder;
    isSelected: boolean;

    constructor(id: number, name: string, email: string, phone: string, gender: string, group: GroupStakeholder) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.group = group;
        this.isSelected = true;
    }
}
