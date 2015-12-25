import {Injectable} from "angular2/core";

@Injectable()
export default class NameList {
	names: Array<string>;
	constructor(){
		this.names = ['Brazil', 'Russia', 'India', 'China' ] ;
	}
	getList() {
    	return this.names;
  	}
};

