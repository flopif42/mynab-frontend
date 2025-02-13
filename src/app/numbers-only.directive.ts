import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[numbersOnly]'
})
export class numbersOnlyDirective {
    // Allow numbers only
    private regex: RegExp = /^[0-9]*$/;

    @HostListener('keypress', ['$event'])
    onKeyPress(event: KeyboardEvent) {
        console.log("In onKeyPress()")
        const key = String.fromCharCode(event.which);
        if (!this.regex.test(key)) {
            event.preventDefault();
        }
    }
}