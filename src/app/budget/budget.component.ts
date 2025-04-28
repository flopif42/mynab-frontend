import { Component, OnInit } from '@angular/core'
import { FormatAmountPipe } from '../utils/format-amount.pipe'
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
                this._budget = response.sort((a, b) => a.id_period.localeCompare(b.id_period))
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

    onPressEnter(event) {
        const currentInput = event.target as HTMLInputElement;
        const formElements = Array.from(document.querySelectorAll('input'));

        const currentIndex = formElements.indexOf(currentInput);
        if (currentIndex >= 0 && currentIndex < formElements.length - 1) {
            (formElements[currentIndex + 1] as HTMLInputElement).focus();
        }

        const params = event.target.id.split("-")
        const formData = {
            "id_period": params[0],
            "id_category": params[1],
            "amount": event.target.value.replace(',', '.') * 100
        }

        this.budgetService.setFunded(formData)
            .subscribe(
                res => {
                    console.log("Budget line set")
                    this.listBudget()
                },
                error => {
                    console.error("Error setting budget line")
                }
            )
    }

    selectText(event: FocusEvent) {
        (event.target as HTMLInputElement).select();
    }
}
