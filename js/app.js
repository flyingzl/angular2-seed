import {Component, Template, bootstrap, Foreach} from 'angular2/angular2';
import {NameList} from 'services/NameList';

@Component({
  selector: 'sample-app',
  componentServices: [
    NameList
  ]
})
@Template({
  url: './templates/sample-app.html',
  directives: [Foreach]
})
class SampleApp {
  constructor() {
    this.names = NameList.get();
    this.newName = '';
  }
  addName(newname) {
    this.names.push(newname.value);
    newname.value = '';
  }

  removeName(name){
    var index = this.names.indexOf(name);
    name !== -1 && this.names.splice(index, 1);
  }
  
}

export function main() {
  bootstrap(SampleApp);
};
