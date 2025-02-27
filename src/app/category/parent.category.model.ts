import { Category } from './category.model'

export class ParentCategory {
    id: number;
    name: string;
    position: number;
    child_categories;

    constructor(parentCatId, parentCatName, parentCatPosition) {
        this.id = parentCatId;
        this.name = parentCatName;
        this.position = parentCatPosition;
        this.child_categories = [];
    }

    addChild(category: Category) {
        this.child_categories.push(category);
    }
}
