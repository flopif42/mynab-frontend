import { Category } from './category.model'

export class ParentCategory {
    id: number;
    name: string;
    position: number;
    child_categories: Category[];

    constructor(parentCatName, parentCatPosition) {
        this.name = parentCatName;
        this.position = parentCatPosition;
    }

    addChild(category: Category) {
        this.child_categories.push(category)
    }
}
