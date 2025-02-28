import { Component, OnInit } from '@angular/core'
import { FormatAmountPipe } from '../format-amount.pipe'
import { BudgetService } from './budget.service'
import { Budget } from './budget.model'
import { ParentCategory } from '../category/parent.category.model'
import { Category } from '../category/category.model'
import { CategoryService } from '../category/category.service'

@Component({
    selector: 'budget-home',
    templateUrl: './budget.component.html',
    styleUrl: './budget.component.css',
    imports: [FormatAmountPipe]
})
export class BudgetComponent implements OnInit {
    _parentCategories: ParentCategory[]
    _budget: Budget[]

    constructor(private budgetService: BudgetService, private categoryService: CategoryService) { }

    ngOnInit() {
        this.listBudget()
        this.fetchCategories()
    }

    fetchCategories() {
        this.categoryService.getList().subscribe(
            response => {
                this._parentCategories = response.sort((a, b) => a.position - b.position)
            },
            error => {
                console.error("Error fetching categories from budget")
            })
    }

    listBudget() {
        this.budgetService.getList().subscribe(
            response => {
                this._budget = response
            },
            error => {
                console.error("Error fetching budget")
            }
        )
    }

    getCategoryBudgetLine(id_period: string, id_category: number): Category {
        for (const budgetLine of this._budget) {
            if (budgetLine.id_period == id_period) {
                for (const cat of budgetLine.categories) {
                    if (cat.id == id_category) {
                        return cat;
                    }
                }
            }
        }
        return null
    }

    myFunction(event) {
        console.log("Enter key pressed ! " + event.target.value);
    }
}
