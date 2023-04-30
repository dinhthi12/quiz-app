import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-infor-user',
  templateUrl: './infor-user.component.html',
  styleUrls: ['./infor-user.component.scss'],
})
export class InforUserComponent implements OnInit {
  private _inforUserJson = 'assets/db/Students.json';
  loginUser: any = [];
  user :any = [];
  constructor(private httpClient: HttpClient,
    private ActivatedRoute: ActivatedRoute ) {}

  ngOnInit(): void {
    this.getAllInforStudentByUsername();
  }

  getAllInforStudentByUsername() {
    this.httpClient.get<any>(this._inforUserJson).subscribe((data:any) => {
      console.log(data);
     let user = JSON.parse(localStorage.getItem('user') || '{}');

     console.log(user[0].username);
      //localStorage.setItem('user', JSON.stringify(this.loginUser));


      for(let el of data) {
        //console.log(el.username);
        if(el.username === user[0].username) {
          this.loginUser = el;
          console.log( this.loginUser = el);
        }else{
          //console.log("0");
        }
      }
    });
  }

  click(){
    alert("chức năng chưa hoàn thiện");
  }
}
