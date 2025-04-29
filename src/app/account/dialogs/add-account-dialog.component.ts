import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { materialImports } from '../../utils/material';


@Component({
    selector: 'add-account-dialog',
    templateUrl: 'add-account-dialog.component.html',
<<<<<<< HEAD
    imports: [ReactiveFormsModule, FormsModule, materialImports],
=======
    imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions
    ],
>>>>>>> parent of 2087de5 (y)
})
export class AddAccountDialogComponent implements OnInit {
    _addAccountForm: FormGroup;

    constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddAccountDialogComponent>) {}

    ngOnInit() {
        this._addAccountForm = this.fb.group({
            account_name: ['', [Validators.required]]
        });
    }

    save() {
        this.dialogRef.close(this._addAccountForm.value);
    }

    close() {
        this.dialogRef.close();
    }
}
