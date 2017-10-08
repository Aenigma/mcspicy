import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class RecipesService {

  constructor(private http: HttpClient) { }

  public getRecipes(): Observable<any> {
    let headers = new HttpHeaders().set('x-api-key', environment.apiKey).set('Access-Control-Request-Headers', '*');

    return this.http.get("http://dakissocool.mybluemix.net/recipes", { headers: headers });
  }

}
