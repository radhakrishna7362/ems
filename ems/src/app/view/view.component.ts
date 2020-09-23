import { Component, OnInit } from '@angular/core';
// import {emp} from '../employee/employee.component';
import {EmployeesService} from '../services/employees.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import { employee } from '../shared/employee';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  displayedColumns=['EmployeeId','FirstName','LastName','Education','Phone','Email','Experience','Salary','Edit','Delete'];
  employees:employee[];
  constructor(private employeesService:EmployeesService,private router:Router,private snackBar: MatSnackBar) { 
    this.fetchRecords();
  }

  ngOnInit(): void {
    this.fetchRecords();
  }

  fetchRecords(){
    this.employeesService.getRecords().subscribe((data:employee[])=>{
      this.employees=data;
      console.log(this.employees)
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
}
