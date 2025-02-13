import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[numbersOnly]'
})
export class numbersOnlyOnlyDirective {
    // Allow numbers only
    private regex: RegExp = /^[0-9]*$/;

    @HostListener('keypress', ['$event'])
    onKeyPress(event: KeyboardEvent) {
        const key = String.fromCharCode(event.which);
        if (!this.regex.test(key)) {
            event.preventDefault();
        }
    }
}