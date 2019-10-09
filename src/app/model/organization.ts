import {Industry} from './industry';

export class Organization {
    id: number;
    name: string;
    industries: Industry[] = [];

    constructor(objectResponse: any) {
        this.id = objectResponse.id;
        this.name = objectResponse.name;
        objectResponse.industries.forEach((industry: Industry) => {
            this.industries.push(industry);
        });
        console.log(objectResponse);
    }
}
