import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService,
    private _router: Router,private snackbar:MatSnackBar) { }
  
  canActivate(): boolean {
    if (this._authService.loggedIn()) {
      console.log('true')
      return true
    } else {
      console.log('false')            
      this._router.navigate(['/login'])
      this.snackbar.open('PLEASE LOGIN','OK',{
        duration: 3000,
      });
      return false
    }
  }
  
}
