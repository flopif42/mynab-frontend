import { Category } from './category.model'

export class ParentCategory {
    id: number;
    name: string;
    can_be_deleted: number;
    position: number;
    child_categories;

    constructor(parentCatId, parentCatName, canBeDeleted, parentCatPosition) {
        this.id = parentCatId;
        this.name = parentCatName;
        this.can_be_deleted = canBeDeleted;
        this.position = parentCatPosition;
        this.child_categories = [];
    }

    addChild(category: Category) {
        this.child_categories.push(category);
    }
}
