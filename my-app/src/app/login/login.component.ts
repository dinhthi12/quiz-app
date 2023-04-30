import { HttpClient } from '@angular/common/http';
import { AuthenticationServiceService } from './../service/authentication-service.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login: FormGroup | any;
  loading = false;
  submitted = false;
  loginUser: any[] = [];
  loginObj: any = {
    username: '',
    password: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {

    this.login = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.login.controls; }
  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.login.invalid) {
        return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
      alert("Đăng nhập không thành công");
      this.login.reset();
    }

  }
  loginData(login: FormGroup) {


//


    this.httpClient.get<any>('assets/db/Students.json').subscribe((data) => {
      const user = data.find((a: any) => {
        return (
          a.username === this.login.value.username &&
          a.password === this.login.value.password
        );
      });

      //console.log(data);
      if (user) {
        this.loginUser.push(this.loginObj);
        localStorage.setItem('user', JSON.stringify(this.loginUser));
        this.router.navigate(['/home']);
      } else {
        this.onSubmit();
      }
    });
  }


}
