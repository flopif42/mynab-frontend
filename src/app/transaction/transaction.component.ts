import { Component } from '@angular/core';

@Component({
    selector: 'transaction-home',
    templateUrl: './transaction.component.html'
})
export class TransactionComponent {
    m_transactions = [
        {
            amount: 810,
            date_trans: "14/01/2025",
            flow: "outflow",
            id_account: "tickets_resto",
            id_payee: "quick",
            id_trans: 1,
            memo_trans: "menu"
        }
    ];
}
