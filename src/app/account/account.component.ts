import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html'
})
export class DropdownComponent implements OnInit {
    myForm: FormGroup;
    // Options for the dropdown list
    options = [
        { value: '1', label: 'Option One' },
        { value: '2', label: 'Option Two' },
        { value: '3', label: 'Option Three' }
    ];

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        // Create the form group with a control for the dropdown
        this.myForm = this.fb.group({
            selectedOption: ['']  // Initial value is empty or you can set a default value
        });
    }

    // Optional: For debugging, you can log the selected option
    onSubmit(): void {
        console.log('Selected option:', this.myForm.value.selectedOption);
    }
}
