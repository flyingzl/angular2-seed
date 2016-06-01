
export class CountryService {
	constructor(){
		this.names = ['Brazil', 'Russia', 'India', 'China' ] ;
	}
	getCountries() {
    	return this.names;
  	}
};

