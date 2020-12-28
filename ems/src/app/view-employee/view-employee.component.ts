import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

  constructor(private router: ActivatedRoute,private employeesService:EmployeesService) { }
  _id
  
  formData={
    id:new FormControl('',[Validators.required]),
    fname:new FormControl('',[Validators.required,Validators.minLength(2)]),
    lname:new FormControl('',[Validators.required,Validators.minLength(2)]),
    edu:new FormControl('',[Validators.required]),
    salary:new FormControl('',[Validators.required]),
    exper:new FormControl('',[Validators.required]),
    phone:new FormControl('',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    address:new FormControl('',[Validators.required]),
    department:new FormControl('',[Validators.required])
  }


  ngOnInit(): void {
    this.router.params.subscribe((params)=>{
      this._id=params.id;
      this.employeesService.getRecordById(this._id).subscribe((data:any)=>{
        this.formData.id.setValue(data.id);
        this.formData.fname.setValue(data.fname);
        this.formData.lname.setValue(data.lname);
        this.formData.edu.setValue(data.edu);
        this.formData.salary.setValue(data.salary);
        this.formData.exper.setValue(data.exper);
        this.formData.phone.setValue(data.phone);
        this.formData.email.setValue(data.email);
        this.formData.address.setValue(data.address);
        this.formData.department.setValue(data.department);
      })
    });
  }

}
