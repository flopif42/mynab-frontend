import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface AccountInfo {
    accountName: string;
}

@Component({
    selector: 'add-account-dialog',
    templateUrl: 'add-account-dialog.component.html',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
    ],
})
export class AddAccountDialogComponent {
    readonly _accountParams = inject<AccountInfo>(MAT_DIALOG_DATA);
    readonly _account_name = model(this._accountParams.accountName);

    constructor(private dialogRef: MatDialogRef<AddAccountDialogComponent>) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
