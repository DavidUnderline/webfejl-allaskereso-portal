import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Auth, signInWithEmailAndPassword, signOut, authState, User, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { JobSeeker } from '../pages/profile/jobseeker/jobseeker.component';
import { Company } from '../pages/profile/company/company.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUser: Observable<any>;

  constructor(private auth : Auth, private router: Router) {
    this.currentUser = authState(auth);
  } 

  signin(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password).then(cred => {
      this.updatelogstatus(true);
      this.router.navigate(['./profile']);
      return cred;
    })
  }

  signout(): Promise<void> {
    return signOut(this.auth).then(() => { 
      this.updatelogstatus(false);
      localStorage.clear();
      this.router.navigate(['/home']);
    });
  }

  isloggedin(): Observable<any> { return this.currentUser; }
  
  updatelogstatus(isloggedin: boolean): void {
    localStorage.setItem("isloggedin", isloggedin ? "true" : "false");
  }
}
