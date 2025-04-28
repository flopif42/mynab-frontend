import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return control.value.password === control.value.confirm_password ? null : { PasswordNoMatch: true };    
    }
}
