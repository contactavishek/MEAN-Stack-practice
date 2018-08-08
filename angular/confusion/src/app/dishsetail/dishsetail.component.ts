import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Dish } from '../shared/dish';

import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';

import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Comment } from '../shared/comment';
import { Feedback } from '../shared/feedback';
import { visibility, flyInOut, expand } from '../animations/app.animation';


@Component({
  selector: 'app-dishsetail',
  templateUrl: './dishsetail.component.html',
  styleUrls: ['./dishsetail.component.css'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    visibility(),
    expand()
  ]
})
export class DishsetailComponent implements OnInit {
  
  @ViewChild('fform') commentFormDirective;

  dish: Dish;
  dishcopy = null;
  dishIds: number[];
  prev: number;
  next: number;
  errMess: string;

  reactiveForm: FormGroup;
  feedback : Feedback;
  comment: Comment;
  visibility = 'shown';
  
  constructor(private dishservice: DishService, private location: Location,
       private route: ActivatedRoute, private rf: FormBuilder, 
        @Inject('BaseURL') private BaseURL) {
         this.createForm();
        }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
    .switchMap((params: Params) => { this.visibility = 'hidden'; 
    return this.dishservice.getDish(+params['id']); })
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id);
    this.visibility = 'shown'; },
      errmess => this.errMess = <any>errmess);
    
  }

  createForm(){
    this.reactiveForm = this.rf.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      comment: ['', Validators.required],
      rating: '5'
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
    this.comment = this.reactiveForm.value;
    let dt = new Date();
    this.comment.date = dt.toISOString();
    this.dishcopy.comments.push(this.comment);
    this.dishcopy.save().subscribe(dish => this.dish = dish);
    this.commentFormDirective.resetForm();
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
