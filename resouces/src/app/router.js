import { Component, provide } from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {LocationStrategy, HashLocationStrategy, Location} from '@angular/common';
import {
	Routes,
	Route,
	ROUTER_PROVIDERS,
	ROUTER_DIRECTIVES
} from '@angular/router';
    
// Video Component
@Component({ 
    selector: 'my-video',
    template: `
            <h1>I LOVE THIS VIDEO!</h1>
        `,

    styles: [`h1{background:#0f0;}`]
})
class Video { }
        
//Music Component
@Component({ 
    selector: 'my-music',
    template: `
            <h1>THAT'S FANTASTIC MUSIC!, RoutParams: {{id}}</h1>
        `,
    styles: [`h1{background:#f00;}`]
})
class Music {
	routerOnActivate(curr, prev, currTree, prevTree) {
		this.id =  curr.getParam('id');
	}
 }
    
@Component({ 
    selector: 'my-router',
	directives: [ROUTER_DIRECTIVES],
    template : `
        <nav>
            <a [routerLink]="['/video']">video</a> | 
            <a [routerLink]="['/music','idParams']">music</a>
        </nav>
        <main>
            <router-outlet></router-outlet>
        </main>
    `

})
@Routes([
    new Route({path: '/video', component: Video }),
    new Route({path:'/music/:id', component:Music })
])
class App{
    constructor(location:Location) {
        location.go('/video');
    }
}

bootstrap(App, [
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy })
]);