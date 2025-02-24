import { Category } from './category.model'

export class ParentCategory {
    id: number;
    name: string;
    child_categories: Category[]
}
