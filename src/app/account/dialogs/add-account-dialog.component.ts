import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle, } from '@angular/material/dialog';
import { materialImports } from '../../utils/material'

@Component({
    selector: 'add-account-dialog',
    templateUrl: 'add-account-dialog.component.html',
    imports: [
        FormsModule,
        ReactiveFormsModule,

        materialImports/*,
        
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions
        */
    ]
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
