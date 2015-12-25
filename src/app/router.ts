import { Component, provide } from "angular2/core";
import {bootstrap} from "angular2/platform/browser";

import {
    ROUTER_PROVIDERS, 
    ROUTER_DIRECTIVES,
    Location,
    LocationStrategy, 
    HashLocationStrategy,
    RouteParams,
    RouteConfig
} from "angular2/router";
    
// Video Component
@Component({ 
    selector: "my-video",
    template: `
            <h1>I LOVE THIS VIDEO!</h1>
        `,

    styles: [`h1{background:#0f0;}`]
})
class Video { }
        
//Music Component
@Component({ 
    selector: "my-music",
    template: `
            <h1>THAT'S FANTASTIC MUSIC!, RoutParams: {{id}}</h1>
        `,
    styles: [`h1{background:#f00;}`]
})
class Music {
    id: string;
    constructor(params:RouteParams){
        this.id = params.get('id');
    }
 }
    
@Component({ 
    selector: "my-router",
    directives: [ROUTER_DIRECTIVES],
    template : `
        <nav>
            <b [routerLink]="['/Video']">video</b> | 
            <b [routerLink]="['/Music', {id:'params'}]">music</b>
        </nav>
        <main>
            <router-outlet></router-outlet>
        </main>
    `

})
@RouteConfig([
    {path: "/video", component: Video, as: "Video" },
    {path:"/music/:id", component:Music, as:"Music"}
])
class App{ 
    constructor(location: Location) {
        location.go('/video');
    }     
}
       
export function main(){
    bootstrap(App, [
        ROUTER_PROVIDERS,
        provide(LocationStrategy, { useClass: HashLocationStrategy })
    ]);
}