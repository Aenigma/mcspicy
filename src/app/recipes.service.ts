import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

import { Observable } from 'rxjs/Observable';
import { recipeList } from './test';

@Injectable()
export class RecipesService {

  constructor(private http: HttpClient) { }

  public getRecipes(): any {
    // let headers = new HttpHeaders().set('x-api-key', environment.apiKey).set('Access-Control-Request-Headers', '*');

    return recipeList;//this.http.get("https://gdt-api.mccormick.com/recipes?page=2&size=50"/*, { headers: headers }*/);
  }

}
