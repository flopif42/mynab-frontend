import { Component, OnInit } from '@angular/core'
import { FormatAmountPipe } from '../format-amount.pipe'
import { BudgetService } from './budget.service'
import { Budget } from './budget.model'
import { ParentCategory } from '../category/parent.category.model'
import { CategoryService } from '../category/category.service'

@Component({
    selector: 'budget-home',
    templateUrl: './budget.component.html',
    styleUrl: './budget.component.css',
    imports: [FormatAmountPipe]
})
export class BudgetComponent implements OnInit {
    _budget: Budget[]
    _parentCategories: ParentCategory[]

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
}
