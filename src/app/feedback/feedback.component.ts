import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  useForm: FormGroup;
  submitted = false;
  model: FeedbackViewModel = {
    name: '',
    email: '',
    feedback: ''
  }
  constructor(private builder: FormBuilder, private service: ApiServiceService) {
  }

  ngOnInit(): void {
    this.useForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'feedback': new FormControl(null, [Validators.required, Validators.minLength(10)])
    });
  }

  sendFeedback() {
    this.submitted = true;
    if (this.useForm.invalid) {
      return;
    }
    this.service.sendFeedback(this.model).subscribe((res) => { location.reload() }, (error) => alert("error"));
  }

}

export interface FeedbackViewModel {
  name: string,
  email: string,
  feedback: string
}
