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
  
  recipes: Observable<any>;
  confidence: number = 0;

  constructor(private recipesService: RecipesService) { }

  public sendImage(e: any) {
    var blobFile = e.target.files[0];
    var formData = new FormData();
    formData.append("image", blobFile);

    this.recipes = this.recipesService.sendImage(formData)
      .map(
        (res: any) => {
          this.confidence = Math.round(res.confidence);
          this.searchBox.setValue(res.query);
          return res.result;
        }
      );
  }

  ngOnInit() {
    this.searchBox.valueChanges.debounceTime(1000)
      .subscribe(
        // listen to value change
        (key: string) => {
          if (key && this.confidence == 0) {
            this.recipes = this.recipesService.getRecipes(key);
          }
        }
      )
  }

}
