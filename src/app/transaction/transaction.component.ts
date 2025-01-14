import { Component } from '@angular/core';

@Component({
    selector: 'transaction-home',
    templateUrl: './transaction.component.html',
})
export class TransactionComponent {
    m_transactions = [
        {
            "amount": 5000.0,
            "created_at": "2025-01-14",
            "description": "Salary",
            "type": "TransactionType.INCOME"
        },
        {
            "amount": 200.0,
            "created_at": "2025-01-14",
            "description": "Dividends",
            "type": "TransactionType.INCOME"
        },
        {
            "amount": -50.0,
            "created_at": "2025-01-14",
            "description": "pizza",
            "type": "TransactionType.EXPENSE"
        },
        {
            "amount": -100.0,
            "created_at": "2025-01-14",
            "description": "Rock Concert",
            "type": "TransactionType.EXPENSE"
        },
        {
            "amount": -58.47,
            "created_at": "2025-01-14",
            "description": "courses Auchan",
            "type": "TransactionType.EXPENSE"
        }
    ]
}
