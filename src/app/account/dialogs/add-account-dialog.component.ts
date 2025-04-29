import { /*FormBuilder, */Validators, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { materialImports } from '../../utils/material';
import { MatDialogRef } from '@angular/material/dialog';

export const addAccountDialogConfig = {
    width: '360px',
    height: '610px'
}

@Component({
    selector: 'add-account-dialog',
    templateUrl: './add-account-dialog.component.html',
    imports: [materialImports, ReactiveFormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddAccountDialogComponent {
    constructor(private dialogRef: MatDialogRef<AddAccountDialogComponent>) { }
    /*
    _addAccountForm = new FormGroup();

    constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddAccountDialogComponent>) {
        this._addAccountForm = this.fb.group({
            account_type: new FormControl(1, [Validators.required]),
            account_name: new FormControl('', [Validators.required]),
            account_balance: new FormControl('', ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)]])
        });
    }
    */

    _addAccountForm = new FormGroup({
        account_type: new FormControl(1, [Validators.required]),
        account_name: new FormControl('', [Validators.required]),
        account_balance: new FormControl('', [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)])
    });

    onSubmit() {
        if (this._addAccountForm.valid) {
            this.dialogRef.close(this._addAccountForm.value);
        }
    }

    onCancel() {
        this.dialogRef.close();
    }
}

