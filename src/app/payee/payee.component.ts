import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PayeeService } from './payee.service'
import { Payee } from './payee.model'
import Sortable from 'sortablejs';

@Component({
    selector: 'app-payee',
    templateUrl: './payee.component.html',
    styleUrl: './payee.component.css',
    imports: [ReactiveFormsModule]
})
export class PayeeComponent implements OnInit {
    _newPayeeForm = new FormGroup({
        payee_name: new FormControl('', [Validators.required])
    });

    accounts = [
        { id: 1, name: 'Checking Account' },
        { id: 2, name: 'Savings Account' },
        { id: 3, name: 'Investment Account' },
    ];

    _payees = [];

    constructor(private payeeService: PayeeService) { }

    ngOnInit() {
        this.listPayees()
    }

    listPayees() {
        this.payeeService.getList().subscribe(
            response => {
                const payeesFromApi: Payee[] = response
                this._payees.length = 0;
                payeesFromApi.forEach((payee: Payee) => {
                    this._payees.push(payee)
                })
                this._payees.sort((a, b) =>
                    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
                );
            },
            error => {
                console.error("Error fetching payees")
            }
        )
    }

    onClickAddPayee() {
        if (this._newPayeeForm.value && this._newPayeeForm.value.payee_name) {
            this.payeeService.create(this._newPayeeForm.value.payee_name)
                .subscribe(
                    res => {
                        console.log("Payee created")
                        this.listPayees()
                        this._newPayeeForm.get('payee_name').setValue('')
                    },
                    error => {
                        console.error("Error creating payee")
                    }
                )
        }
    }

    okClickDeletePayee(payeeId) {
        if (confirm("Are you sure you want to delete this payee ?")) {
            this.payeeService.delete(payeeId)
                .subscribe(
                    res => {
                        console.log("Payee deleted")
                        this.listPayees()
                    },
                    error => {
                        console.error("Error deleting payee")
                    }
                )
        }
    }

    ngAfterViewInit() {
        const list = document.getElementById('sortable-list');
        if (list) {
            Sortable.create(list, {
                animation: 150,
                onEnd: (event) => {
                    const [movedItem] = this.accounts.splice(event.oldIndex!, 1);
                    this.accounts.splice(event.newIndex!, 0, movedItem);
                    console.log('Updated order:', this.accounts);
                },
            });
        }
    }
}
