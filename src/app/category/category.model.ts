export class Category {
    id: number;
    id_parent: number;
    name: string;
    can_be_deleted: number;
    funded: number;
    spent: number;

    constructor(categoryId, categoryName) {
        this.id = categoryId;
        this.name = categoryName;
    }
}
