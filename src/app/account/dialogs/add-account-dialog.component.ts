import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { materialImports } from '../../utils/material'

@Component({
    selector: 'add-account-dialog',
    templateUrl: 'add-account-dialog.component.html',
    imports: [FormsModule, ReactiveFormsModule, materialImports]
})
export class AddAccountDialogComponent implements OnInit {
    _addAccountForm: FormGroup;

    constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddAccountDialogComponent>) {}

    ngOnInit() {
        this._addAccountForm = this.fb.group({
            account_name: ['', Validators.required],
            account_type: ['', Validators.required],
            account_balance: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)]]
        });
    }

    save() {
        this.dialogRef.close(this._addAccountForm.value);
    }

    close() {
        this.dialogRef.close();
    }
}
