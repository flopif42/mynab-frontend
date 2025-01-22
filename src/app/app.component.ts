import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [RouterLink, RouterOutlet, HttpClientModule],
})
export class AppComponent {
    title = 'MYNAB';
}
