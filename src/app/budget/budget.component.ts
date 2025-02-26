import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { BudgetService } from './budget.service';
import { Budget } from './budget.model'

@Component({
    selector: 'budget-home',
    templateUrl: './budget.component.html',
    styleUrl: './budget.component.css',
    imports: [CurrencyPipe]
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
            },
            error => {
                console.error("Error fetching budget")
            }
        )
    }
}
