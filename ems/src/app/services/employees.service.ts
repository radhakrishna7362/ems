import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  uri = 'http://localhost:4000';

  constructor(private http:HttpClient) {
  }

  getRecords(id){
    return this.http.get(`${this.uri}/employees/${id}`);
  }

  addRecord(student) {
    return this.http.post(`${this.uri}/employees/add`, student);
  }

  deleteRecord(id) {
    return this.http.delete(`${this.uri}/employees/delete/${id}`);
  }

  getRecordById(id){
    return this.http.get(`${this.uri}/employees/employee/${id}`);
  }

  updateRecord(id,student){
    return this.http.patch(`${this.uri}/employees/edit/${id}`,student);
  }

}
