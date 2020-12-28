import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'employees',component:EmployeeComponent,canActivate: [AuthGuard]},
  {path:'view',component:ViewComponent,canActivate: [AuthGuard]},
  {path:'edit/:id',component:EditComponent,canActivate: [AuthGuard]},
  {path:'view/:id',component:ViewEmployeeComponent,canActivate: [AuthGuard]},
  {path:'',redirectTo:'view',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
