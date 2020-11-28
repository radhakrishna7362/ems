import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ems';

  constructor(public _authService: AuthService,private _router:Router){
    
  }

  logout(){
    this._authService.logoutUser();
    this._router.navigate(['/login']);
  }

}
