import { Component, OnInit } from "angular2/core";
import {bootstrap} from "angular2/platform/browser";
import NameList from './services/namelist-service';

@Component({
    selector: 'sample-app',
    providers: [NameList],
    templateUrl: 'app/templates/sample-app.html',
    directives: []
})
class SampleApp {
    names: Array<string>;
    name: string;
    constructor(private _service:NameList) {
        this.name = '';
    }

    ngOnInit(){
        this.names = this._service.getList();
    }
    
    addName(name:string) {
        this.names.push(name);
        this.name = "";
    }

    removeName(name:string) {
        var index = this.names.indexOf(name);
        index !== -1 && this.names.splice(index, 1);
    }
}



export function main(){
	bootstrap(SampleApp);
}

