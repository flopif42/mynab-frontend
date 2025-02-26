import { Component, OnInit } from '@angular/core';
import { BudgetService } from './budget.service';
import { Budget } from './budget.model'

@Component({
    selector: 'budget-home',
    templateUrl: './budget.component.html',
    styleUrl: './budget.component.css'
})
export class BudgetComponent implements OnInit {
    _budget: Budget[]

    constructor(private budgetService: BudgetService) { }

    ngOnInit() {
        this.listBudget()
    }

    listBudget() {
        this.budgetService.getList().subscribe(
            response => {
                this._budget = response
                console.log(this._budget)
            },
            error => {
                console.error("Error fetching budget")
            }
        )
    }
}
