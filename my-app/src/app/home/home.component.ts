import { Router } from '@angular/router';
import { HomeService } from './../service/home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  homeList: any = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 6; //số lượng phần tử đc in ra
  //tableSizes: any = [3, 6, 9, 12];

  ngOnInit(): void {
    this.getAllHome();
  }

  constructor(private homeService: HomeService,
    private router: Router,) {}

  getAllHome() {
    this.homeService.getAllHome().subscribe((home) => {
      this.homeList = home;
    });
  }

  onTableDataChange(event: any) {
    //page hiện tại
    this.page = event;

    this.getAllHome();
  }

  // onTableSizeChange(event: any): void {
  //   this.tableSize = event.target.value;
  //   console.log(this.tableSize);
  //   this.page = 1;
  //   this.getAllHome();
  // }

  //func kiểm tra xem đã có tồn tại account trong localStorage chưa
  check() {
    if (localStorage.getItem('user')) {
      //console.log('1');
    } else {
      alert('chưa đăng nhập');
      this.router.navigate(['/login']);
    }
  }
}
