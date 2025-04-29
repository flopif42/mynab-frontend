import { Validators, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { materialImports } from '../../utils/material';

export const addAccountDialogConfig = {
    width: '360px',
    height: '610px'
}

@Component({
    selector: 'add-account-dialog',
    templateUrl: './add-account-dialog.component.html',
    imports: [materialImports],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddAccountDialogComponent {
    _addAccountForm = new FormGroup({
        account_type: new FormControl(1, [Validators.required]),
        account_name: new FormControl('', [Validators.required]),
        account_balance: new FormControl('', ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)]])
    });
}
