import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PayeeService } from './payee.service'
import { Payee } from './payee.model'

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
            },
            error => {
                console.error("Error fetching payees")
            }
        )
    }

    onSubmit() {
        if (this._newPayeeForm.value && this._newPayeeForm.value.payee_name) {
            this.payeeService.create(this._newPayeeForm.value.payee_name)
                .subscribe(
                    res => {
                        console.log("Payee created.")
                        this.listPayees()
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
}
