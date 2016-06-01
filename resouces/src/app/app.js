
import { Component, OnInit, ReflectiveInjector } from "@angular/core";
import {bootstrap} from '@angular/platform-browser-dynamic';
import {CountryService} from './services/service';

@Component({
    selector: 'sample-app',
    template: require('raw!./templates/sample-app.html'),
	providers: [CountryService]
})
class SampleApp {

	countryService: CountryService;

    constructor(countryService:CountryService) {
		this.countryService = countryService;
        this.name = '';
    }

    ngOnInit(){
        this.names = this.countryService.getCountries();
    }
    
    addName(name) {
        this.names.push(name);
        this.name = "";
    }

    removeName(name) {
        var index = this.names.indexOf(name);
        index !== -1 && this.names.splice(index, 1);
    }
}


bootstrap(SampleApp );




