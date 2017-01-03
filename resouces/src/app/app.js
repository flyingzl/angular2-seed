
import { Component, OnInit, NgModule } from "@angular/core";
import { platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms'
import { CountryService} from './services/service';

@Component({
    selector: 'sample-app',
    template: require('raw!./templates/sample-app.html'),
	providers: [CountryService]
})
class SampleApp {

    name = ''

    constructor(countryService:CountryService) {
        this.countryService = countryService;
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


@NgModule({
  imports:      [ BrowserModule, FormsModule],
  declarations: [ SampleApp ],
  bootstrap:    [ SampleApp ]
})
export class AppModule { }


platformBrowserDynamic().bootstrapModule(AppModule );




