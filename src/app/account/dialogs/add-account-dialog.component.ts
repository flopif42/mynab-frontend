import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'add-account-dialog',
    templateUrl: 'add-account-dialog.component.html',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions
    ],
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
