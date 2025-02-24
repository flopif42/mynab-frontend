import { Category } from './category.model'

export class ParentCategory {
    id: number;
    name: string;
    position: number;
    child_categories: Category[]
}
