import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';

@Component({
  selector: 'app-dishsetail',
  templateUrl: './dishsetail.component.html',
  styleUrls: ['./dishsetail.component.css']
  
})
export class DishsetailComponent implements OnInit {
  @Input()
  dish: Dish;
  
  constructor() { }

  ngOnInit() {
  }

}
