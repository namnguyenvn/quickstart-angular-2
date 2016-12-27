import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <nav>
        <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
        <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
        </nav>
        <router-outlet></router-outlet>
    `,
    styleUrls: [ 'app.component.css' ]
})
/* ?? check: The Angular Router provides a routerLinkActive directive we can use to add a class to the HTML navigation element whose route matches the active route. All we have to do is define the style for it. Sweet!
*/

export class AppComponent {
    title = 'Tour of Heroes';
}