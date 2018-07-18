import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dishsetail',
  templateUrl: './dishsetail.component.html',
  styleUrls: ['./dishsetail.component.css']
  
})
export class DishsetailComponent implements OnInit {
  
  dish: Dish;
  
  constructor(private dishservice: DishService, private location: Location,
       private route: ActivatedRoute) { }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    this.dishservice.getDish(id).subscribe(dish => this.dish = dish);
  }
  goBack(): void {
    this.location.back();
  }
}
