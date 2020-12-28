import { Component, OnInit } from '@angular/core';
import {EmployeesService} from '../services/employees.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  displayedColumns=['EmployeeId','Name','Phone','Email','Education','Last Updated','Edit','Delete','View'];
  employees=[]
  length
  List=[]
  name:String;
  constructor(private employeesService:EmployeesService,private router:Router,private snackBar: MatSnackBar,private authService:AuthService) { 
    this.fetchRecords();
  }

  ngOnInit(): void {
    this.fetchRecords();
  }

  fetchRecords(){
    this.authService.getUserId().subscribe(
      (res)=>{
        this.employeesService.getRecords(res).subscribe((data:any[])=>{
          this.List=data;
          this.employees=this.List;
          this.length=this.employees.length
          console.log(this.List)
        });
      });
  }
  delete(id){
    console.log(id)
    this.employeesService.deleteRecord(id).subscribe(() => {
      this.snackBar.open('Employee Deleted !!', 'OK', {
        duration: 3000,
      });
      this.fetchRecords();
    });
  }
  edit(id){
    this.router.navigate([`edit/${id}`]);
  }
  view(id){
    this.router.navigate([`view/${id}`]);
  }

  Search(){
    if(this.name != ""){
      this.employees = this.List.filter(res=>{
        return res.id.match(this.name);
      });
      this.length=this.employees.length;
    }
    else if(this.name == ""){
     this.ngOnInit();
    }
  }
}
