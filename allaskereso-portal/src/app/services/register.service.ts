import { Injectable } from '@angular/core';
// import { Observable } from "rxjs";
import { Auth, createUserWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { JobSeeker } from '../pages/profile/jobseeker/jobseeker.component';
import { Company } from '../pages/profile/company/company.component';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private auth : Auth, private firestore: Firestore, private router: Router) { }

  async register(email: string, password: string, userdata: Partial<JobSeeker | Company>): Promise<UserCredential> {
    try{
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
  
      await this.createuserdata(userCredential.user.uid, {
        ...userdata,
        id: userCredential.user.uid
      });

      console.log(userCredential);
      return userCredential;
    
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private async createuserdata(id: string, userdata: Partial<JobSeeker | Company>): Promise<void> {
    const userRef = doc(collection(this.firestore, 'Users'), id);
    return setDoc(userRef, userdata);
  }
}
