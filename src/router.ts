import { Component,bootstrap, provide } from "angular2/angular2";
import {
    ROUTER_DIRECTIVES, 
    ROUTER_PROVIDERS, 
    RouteConfig, 
    RouteParams,
    Location,
    LocationStrategy, 
    HashLocationStrategy,
    ROUTER_PRIMARY_COMPONENT
} from "angular2/router";
    
// Video组件
@Component({ 
    selector: "my-video",
    template: `
            <h1>I LOVE THIS VIDEO!</h1>
        `,

    styles: [`h1{background:#0f0;}`]
})
class Video { }
        
//Music 组件
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
    
//App组件
@Component({ 
    selector: "my-app",
    directives: [ROUTER_DIRECTIVES],
    template : `
        <!--声明路由入口-->
        <nav>
            <b [router-link]="['/Video']">video</b> | 
            <b [router-link]="['/Music', {id:'xx'}]">music</b>
        </nav>
        <main>
            <!--声明路由出口-->
            <router-outlet></router-outlet>
        </main>
    `

})
//路由配置注解
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
        provide(LocationStrategy, {useClass: HashLocationStrategy})
    ]);
}