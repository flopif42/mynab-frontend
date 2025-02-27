import { Category } from '../category/category.model'

export class Budget {
    id_period: string; // format : "YYYY_MM"
    categories: Category[];
}
