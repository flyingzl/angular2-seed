import {
	Component,
	CORE_DIRECTIVES,
    FORM_DIRECTIVES,
	bootstrap
} from 'angular2/angular2';

import { NameList } from 'services/NameList';



@Component({
    selector: 'sample-app',
    viewProviders: [NameList],
    templateUrl: './templates/sample-app.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
class SampleApp {
    names: Array<string>;
    name: string;
    constructor(service:NameList) {
        this.names = service.getList();
        this.name = '';
 
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

