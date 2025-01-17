import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [RouterLink, RouterOutlet, DecimalPipe],
})
export class AppComponent {
    title = 'MYNAB';
}
