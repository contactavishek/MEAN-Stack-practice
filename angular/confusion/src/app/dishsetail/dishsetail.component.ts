import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Comment } from '../shared/comment';
import { Feedback } from '../shared/feedback';

@Component({
  selector: 'app-dishsetail',
  templateUrl: './dishsetail.component.html',
  styleUrls: ['./dishsetail.component.css']
  
})
export class DishsetailComponent implements OnInit {
  
  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;

  reactiveForm: FormGroup;
  feedback : Feedback;
  comment: Comment;
  
  
  constructor(private dishservice: DishService, private location: Location,
       private route: ActivatedRoute, private rf: FormBuilder) {
         this.createForm();
        }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
    .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
    
  }

  createForm(){
    this.reactiveForm = this.rf.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      comment: ['', Validators.required],
      rating: ''
    });
    this.reactiveForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();  // reset validation messages now
  }
  
  onValueChanged(data?: any) {
    if (!this.reactiveForm) 
    { return; }
    const form = this.reactiveForm;
    for (const field in this.formErrors) {   
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
              this.formErrors[field] += messages[key] + ' ';
          
          }
        }
    
    }
  }

  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required': 'Author Name is required',
      'minlength': 'Author Name must be at least 2 characters long'
    },
    'comment': {
      'required': 'Comment is required'
    },
  };

  onSubmit() {
    this.feedback = this.reactiveForm.value;
    DISHES.push(this.reactiveForm.value);
    console.log(DISHES);
    this.reactiveForm.reset({
      author: '',
      comment: '',
      rating: '5'
    });
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }
}
