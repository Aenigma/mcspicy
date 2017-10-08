import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

import { Observable } from 'rxjs/Observable';
import { recipeList } from './test';

@Injectable()
export class RecipesService {

  constructor(private http: HttpClient) { }

  public getRecipes(key: string): any {
    // let headers = new HttpHeaders().set('x-api-key', environment.apiKey).set('Access-Control-Request-Headers', '*');

    return this.http.get("http://mcspicy.mybluemix.net/search/" + key/*, { headers: headers }*/);
  }

}
