export class Division {
    id: number;
    name: string;

    constructor(objectRespone: any) {
        this.id = objectRespone.id;
        this.name = objectRespone.name;
    }
}
