import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { RecipesService } from '../recipes.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchBox = new FormControl();
  
  private recipes: Observable<any>;

  constructor(private recipesService: RecipesService) { }

  public flatten(arr) {
    const flat = [].concat(...arr);
    return flat.some(Array.isArray) ? this.flatten(flat) : flat;
  }

  public decode(str: string): string {
    return str.replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCharCode(dec);
    });
  }

  ngOnInit() {
    let arr = [[0, 1, 2], [3, 6], [4, 6, 7, 8, 6]];
    console.log(arr);
    console.log([].concat(...arr));

    this.searchBox.valueChanges.debounceTime(1000)
      .subscribe(
        // listen to value change
        (key: string) => {
          this.recipes = this.recipesService.getRecipes(key).map(
            (recipes: any) => {
              return [].concat(...recipes.map(
                (recipe: any) => {
                  let ingredientBlocks = recipe.ingredients.filter(
                    (ingredient: any) => ingredient.ingredientProductUpc != null
                  )
                  return ingredientBlocks;
                }
              ));
            }
          ).do(
            (val: any) => {
              console.log(val);
            }
          );
        }
      );
  }

}
