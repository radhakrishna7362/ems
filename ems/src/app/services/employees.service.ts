import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http:HttpClient) {
  }

  getRecords(id){
    return this.http.get(`/employees/${id}`);
  }

  addRecord(student) {
    return this.http.post(`/employees/add`, student);
  }

  deleteRecord(id) {
    return this.http.delete(`/employees/delete/${id}`);
  }

  getRecordById(id){
    return this.http.get(`/employees/employee/${id}`);
  }

  updateRecord(id,student){
    return this.http.patch(`/employees/edit/${id}`,student);
  }

}
