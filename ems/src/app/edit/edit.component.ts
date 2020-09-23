import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeesService } from '../services/employees.service';
import { employee } from '../shared/employee';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  employeeForm:FormGroup;
  employe;
  newemployee;
  _id;
  constructor(private router:ActivatedRoute,
    private fb:FormBuilder,
    private snackbar:MatSnackBar,
    private route:Router,
    private employeesService:EmployeesService) { }

    ngOnInit(): void {
      this.router.params.subscribe((params)=>{
        this._id=params.id;
        this.employeesService.getRecordById(this._id).subscribe((data:employee)=>{
          this.employe=data;
          console.log(data)
          this.employeeForm.get('id').setValue(this.employe.id);
          this.employeeForm.get('fname').setValue(this.employe.fname);
          this.employeeForm.get('lname').setValue(this.employe.lname);
          this.employeeForm.get('edu').setValue(this.employe.edu);
          this.employeeForm.get('email').setValue(this.employe.email);
          this.employeeForm.get('phone').setValue(this.employe.phone);
          this.employeeForm.get('exper').setValue(this.employe.exper);
          this.employeeForm.get('ss').setValue(this.employe.ss);
        })
      });
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

    onSubmit(id){
      this.newemployee=this.employeeForm.value;
      console.log(this.newemployee);
      this.employeesService.updateRecord(id,this.newemployee).subscribe(() => {
        this.snackbar.open('Employee Updated !!', 'OK', {
          duration: 3000,
        });
      });
      this.route.navigate(['/view']);
    }
}
