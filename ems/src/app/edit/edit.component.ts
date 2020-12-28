import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  form={userid:null,id:null,fname:null,lname:null,edu:null,salary:null,exper:null,phone:null,email:null,address:null,department:null}
  constructor(private authService:AuthService,private _router:Router,private employeesService:EmployeesService,private router:ActivatedRoute,private snackbar:MatSnackBar) {
    
  }

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

  Error() {
    if (this.formData.id.hasError('required')) {
      return 'Employee Id is required';
    }
  }

  getErrorMessage() {
    if (this.formData.fname.hasError('required')) {
      return 'First Name is required';
    }
    else if(this.formData.fname.hasError('minlength')){
      return 'First Name must be a minimum length of 2';
    }
  }

  getMsg(){
    if (this.formData.lname.hasError('required')) {
      return 'Last Name is required';
    }
    else if(this.formData.lname.hasError('minlength')){
      return 'Last Name must be a minimum length of 2';
    }
  }

  Msg(){
    if (this.formData.salary.hasError('required')) {
      return 'Salary is required';
    }
  }

  err() {
    if (this.formData.edu.hasError('required')) {
      return 'Education is required';
    }
  }

  msg(){
    if (this.formData.exper.hasError('required')) {
      return 'Experience is required';
    }
  }

  Deperr() {
    if (this.formData.department.hasError('required')) {
      return 'Department is required';
    }
  }

  addressMsg(){
    if (this.formData.address.hasError('required')) {
      return 'Address is required';
    }
  }

  ErrMsg(){
    if (this.formData.phone.hasError('required')) {
      return 'Mobile no is required';
    }
    else if(this.formData.phone.hasError('minlength')){
      return 'Mobile no. must be 10 digits';
    }
    else if(this.formData.phone.hasError('maxlength')){
      return 'Mobile no. must be 10 digits';
    }
  }

  getError(){
    if (this.formData.email.hasError('required')) {
      return 'Email is required';
    }
    else if(this.formData.email.hasError('email')){
      return 'Email must be a valid email Address';
    }
  }

  _id

  ngOnInit(): void {
    this.authService.getUserId().subscribe(
      (res)=>{
        this.form.userid=res;
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
    )
  }

  onSubmit(){
    this.form.id=this.formData.id.value;
    this.form.fname=this.formData.fname.value;
    this.form.lname=this.formData.lname.value;
    this.form.salary=this.formData.salary.value;
    this.form.edu=this.formData.edu.value;
    this.form.exper=this.formData.exper.value;
    this.form.phone=this.formData.phone.value;
    this.form.email=this.formData.email.value;
    this.form.department=this.formData.department.value;
    this.form.address=this.formData.address.value;
    this.employeesService.updateRecord(this._id,this.form).subscribe(() => {
      this.snackbar.open('Employee Updated !!', 'OK', {
        duration: 3000,
      });
    });
    this._router.navigate(['/view']);
  }
}
