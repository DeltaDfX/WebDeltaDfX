import {Division} from './division';
import {forEach} from '@angular/router/src/utils/collection';

export class Organization {
    id: number;
    name: string;
    country: string;
    divisions: Division[] = [];

    constructor(objectResponse: any) {
        this.id = objectResponse.id;
        this.name = objectResponse.name;
        this.country = objectResponse.country;
        objectResponse.divisions.forEach((division: Division) => {
            this.divisions.push(division);
        });
    }
}
