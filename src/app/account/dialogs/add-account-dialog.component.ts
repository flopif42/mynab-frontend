import { Component, ChangeDetectionStrategy } from '@angular/core';
import { materialImports } from '../../utils/material';

@Component({
    selector: 'add-account-dialog',
    templateUrl: './add-account-dialog.component.html',
    imports: [materialImports],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddAccountDialogComponent { }
