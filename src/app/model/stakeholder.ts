import {GroupStakeholder} from './group-stakeholder';
import {BusinessUnit} from './business-unit';

export class Stakeholder {
    id: number;
    name: string;
    email: string;
    phone: string;
    gender: string;
    group: GroupStakeholder;
    isSelected: boolean;
    businessUnit: BusinessUnit;

    constructor(id: number, name: string, email: string, phone: string, gender: string, group: GroupStakeholder, businessUnit: BusinessUnit) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.group = group;
        this.isSelected = true;
        this.businessUnit = businessUnit;
    }
}
