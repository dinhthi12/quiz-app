import { CategoryService } from './../../service/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getAllCategory();
  }
  categoryList: any =[];

  constructor(private CategoryService: CategoryService){}


  getAllCategory(){
    this.CategoryService.getAllCategory().subscribe((category) =>{
      this.categoryList = category;

    })
  }




}
