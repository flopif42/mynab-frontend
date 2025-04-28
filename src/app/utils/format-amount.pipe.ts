import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatAmount'
})
export class FormatAmountPipe implements PipeTransform {
    transform(cents: number): string {
        if (isNaN(cents) || cents === null) {
            return '0.00'; // Default fallback
        }
        return (cents / 100).toFixed(2); // Convert cents to euros with 2 decimals
    }
}
