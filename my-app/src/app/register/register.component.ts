import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  registerForm:FormGroup | any;
  submitted = false;
  constructor( private formBuilder: FormBuilder,
    private HttpClient: HttpClient){}


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],

    });
  }

  signUp(){
    this.HttpClient.post<any>('assets/db/students.json',this.registerForm.value).subscribe(data => {
      console.log(data);
    })
  }
  //Add user form actions

}
