import {GroupStakeholder} from '../model/group-stakeholder';
import {Stakeholder} from '../model/stakeholder';

export class JSGroupStakeholder {
    id: number;
    name: string;
    stakeholders: Stakeholder[];
    isChecked = false;


    constructor(id: number, name: string, stakeholders: Stakeholder[], isChecked: boolean) {
        this.id = id;
        this.name = name;
        this.stakeholders = stakeholders;
        this.isChecked = isChecked;
    }
}
