export class Industry {
    id: number;
    name: string;
    country: string;

    constructor(objectRespone: any) {
        this.id = objectRespone.id;
        this.name = objectRespone.name;
        this.country = objectRespone.country;
    }
}
