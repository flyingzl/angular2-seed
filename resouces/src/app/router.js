import { Component, OnInit, NgModule } from "@angular/core";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, ActivatedRoute, Params } from '@angular/router';

import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';



// Video Component
@Component({
    selector: 'my-video',
    template: `
            <h1>I LOVE THIS VIDEO!</h1>
        `,

    styles: [`h1{background:#0f0;}`]
})
class Video {}

//Music Component
@Component({
    selector: 'my-music',
    template: `
            <h1>THAT'S FANTASTIC MUSIC!, RoutParams: {{id}}</h1>
        `,
    styles: [`h1{background:#f00;}`]
})
class Music {
    constructor(route: ActivatedRoute) {
        this.route = route;
    }
    ngOnInit() {
        this.route.params.forEach(params => {
            if (params['id']) {
                this.id = params['id']
            }
        })
    }
}

@Component({
    selector: 'my-router',
    template: `
        <nav>
            <a [routerLink]="['/video']">video</a> | 
            <a [routerLink]="['/music','see_you_again']">music</a>
        </nav>
        <main>
            <router-outlet></router-outlet>
        </main>
    `

})
class RouterApp {}


const routes: Routes = [
    { path: '', redirectTo: '/video', pathMatch: 'full' },
    { path: 'video', component: Video },
    { path: 'music/:id', component: Music }
];


@NgModule({
    imports: [BrowserModule, RouterModule, RouterModule.forRoot(routes)],
    declarations: [RouterApp, Video, Music],
    providers: [
        { provide: APP_BASE_HREF, useValue: '!' },
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [RouterApp]
})
export class AppModule {}


platformBrowserDynamic().bootstrapModule(AppModule);
