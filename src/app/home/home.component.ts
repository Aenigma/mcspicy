import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { RecipesService } from '../recipes.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() searchTerm: string;
  private recipes: any;

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    
  }

  public search(key: string) {
    this.recipes = this.recipesService.getRecipes().content
      .filter((recipe: any) => {
        if (recipe.title.indexOf(key) != -1)
          return recipe
      });
  }

}
