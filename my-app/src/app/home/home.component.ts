import { HomeService } from './../service/home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  homeList :any = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 6;
  tableSizes: any = [3, 6, 9, 12];

  ngOnInit(): void {
    this.getAllHome();
  }


  constructor(private homeService: HomeService){}

  getAllHome(){
    this.homeService.getAllHome().subscribe((home) =>{
      this.homeList = home;

    })
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getAllHome();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllHome();
  }



}
