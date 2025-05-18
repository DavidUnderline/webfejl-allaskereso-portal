import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, collection, updateDoc } from '@angular/fire/firestore';
import { LoginService } from './login.service';
import { from, of, switchMap } from 'rxjs';
import { Auth, updateEmail, user } from '@angular/fire/auth';;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private loginservice: LoginService, private firestore: Firestore, private auth: Auth) { }

  getUserData() {
    // this.dataservice.data1$
    return this.loginservice.currentUser.pipe(
      switchMap(user => {
        // console.log(user)
        if(!user){
          return of(null);
        }
        else {
          return from(this.fetchuserdata(user.uid));
        }
      })
    );
  }

  private async fetchuserdata(userid: string): Promise<any> {
    try{
      const userobj = doc(this.firestore, 'Users', userid);
      // console.log(userobj)
      const snapshot = await getDoc(userobj);
      // console.log(snapshot)

      if(!snapshot.exists()) {
        return { user: null };
      }

      const userdata = snapshot.data() as any;

      localStorage.setItem("iscompany", userdata.iscompany ? "true" : "false");
      localStorage.setItem("id", userdata.id);
      localStorage.setItem("name", userdata.name);
      localStorage.setItem("email", userdata.email);
      localStorage.setItem("cv", userdata.cv);
      return userdata;

    } catch (err) {
      return { user: null, error: err };
    }
  }

  async updateuserdata(id: string, userdata: any): Promise<void> {
    if(this.auth.currentUser?.email !== userdata.email) {
      await updateEmail(this.auth.currentUser as any, userdata.email);
    }

    const userRef = doc(collection(this.firestore, 'Users'), id);
    return updateDoc(userRef, userdata);
  }
}
