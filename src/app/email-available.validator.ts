import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailAvailableValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return control.value.emailAdressAvailable.getValue() != 'no' ? null : { EmailUnavailable: true };    
    }
}
