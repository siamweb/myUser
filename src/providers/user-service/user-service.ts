import { AppSettingsProvider } from '../app-settings/app-settings';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

 
  apiUrl = this.AppSettingsProvider.getApiUrl();
 
  constructor(public http: Http, public AppSettingsProvider: AppSettingsProvider) {
  }
 
  public getUsers() {


    return this.http.get(this.apiUrl + 'users')
      .map(response => response.json().result);
      
  }
 
  public addUser(firstname,lastname,tel) {
    return this.http.post(this.apiUrl + 'users', {'firstname': firstname, 'lastname': lastname, 'tel': tel })
      .map(response => response.json());
  }
 
  public deleteUser(userId) {
    return this.http.delete(this.apiUrl + 'users/' + userId)
      .map(response => response.json());
  }

}
