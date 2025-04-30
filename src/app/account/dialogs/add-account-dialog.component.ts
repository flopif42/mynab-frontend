import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, /*FormBuilder, */FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { materialImports } from '../../utils/material'

@Component({
    selector: 'add-account-dialog',
    templateUrl: 'add-account-dialog.component.html',
    styleUrls: ['./add-account-dialog.component.scss'],
    imports: [FormsModule, ReactiveFormsModule, materialImports]
})
export class AddAccountDialogComponent /*implements OnInit*/ {
    /*
    _addAccountForm: FormGroup;

    constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddAccountDialogComponent>) {}

    ngOnInit() {
        this._addAccountForm = this.fb.group({
            account_name: ['', Validators.required],
            account_type: ['', Validators.required],
            account_balance: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)]]
        });
    }
    */

    constructor(private dialogRef: MatDialogRef<AddAccountDialogComponent>) { }

    _addAccountForm = new FormGroup({
        account_name: new FormControl('', Validators.required),
        account_type: new FormControl('', Validators.required),
        account_balance: new FormControl('', [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)])
    });

    onSubmit() {
        this.dialogRef.close(this._addAccountForm.value);
    }

    onCancel() {
        this.dialogRef.close();
    }
}
