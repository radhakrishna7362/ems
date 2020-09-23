import { Component, OnInit } from '@angular/core';
import {employee} from '../shared/employee';
import {Router} from '@angular/router'
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeeForm:FormGroup;
  emp:employee;
  constructor(private fb:FormBuilder,private router:Router,private employeesService:EmployeesService) {
    
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.employeeForm=this.fb.group({
      id:['',[Validators.required]],
      fname:['',[Validators.required]],
      lname:['',[Validators.required]],
      edu:['',[Validators.required]],
      phone:['',[Validators.required]],
      email:['',[Validators.required]],
      exper:['',[Validators.required]],
      ss:['',[Validators.required]]
    });
  }

  onSubmit(){
    this.emp=this.employeeForm.value;
    console.log(this.emp);
    this.employeesService.addRecord(this.emp).subscribe();
    this.emp = null;
    this.employeeForm.reset({
      id:'',
      name:'',
      edu:'',
      phone:'',
      email:'',
      exper:'',
      ss:''
    });
    this.router.navigate(['/view']);
  }
}

// export const emp:employee[] = [];