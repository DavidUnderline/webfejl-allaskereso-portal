import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, orderBy, collection, query, where } from '@angular/fire/firestore';
import { Observable, from, map, switchMap, of, take, firstValueFrom } from 'rxjs';
import { LoginService } from './login.service';
import { Job } from '../pages/jobs/job/job.component';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  constructor(private firestore: Firestore, private loginservice: LoginService) { }

  // get jobs
  getJobs() {
    return from(this.fetchjobsdata());
  }

  async fetchjobsdata(): Promise<any> {
    const jobscollection = collection(this.firestore, 'Jobs');
    const querySnapshot = await getDocs(jobscollection);
    // console.log(querySnapshot.docs)
    // const bathsize = 5;

    const jobs: any[] = [];

    for (const documentSnapshot of querySnapshot.docs) {
      const job = documentSnapshot.data() as any;
      job.id = documentSnapshot.id;

      if (job.company_id) {
        const companyDocRef = doc(this.firestore, 'Users', job.company_id);
        const companyDocSnapshot = await getDoc(companyDocRef);

        if (companyDocSnapshot.exists()) {
          const companyData = companyDocSnapshot.data() as any;
          job.companyname = companyData.name;
        } else {
          job.companyname = 'Company Not Found';
        }
      } else {
        job.companyname = 'No Company ID';
      }

      jobs.push(job);
    }

    return jobs;
  }

  // get user jobs
  getUserJobs() {
    return from(this.fetchuserjobsdata());
  }

  fetchuserjobsdata(): Observable<any> {
    const jobscollection = collection(this.firestore, 'Jobs');
    let jobquery: any;
    if(localStorage.getItem("iscompany") === "true") {
      jobquery = query(jobscollection, where('company_id', '==', localStorage.getItem("id")));
    
    } else{
      jobquery = query(jobscollection, where('jobseeker_id', '==', localStorage.getItem("id")));
    }

    const res =  from(getDocs(jobquery)).pipe(
      map((querySnapshot) => {
        const jobs: any[] = [];
        querySnapshot.forEach((doc) => {
          const job = doc.data() as any;
          job.id = doc.id;
          jobs.push(job);
        });
        return jobs;
      })
    );

    return res;
  }

  async addjob(job: any): Promise<any> {
    try{
      const jobscollection = collection(this.firestore, 'Jobs');
      const ref = await addDoc(jobscollection, job);

      const jobref = await updateDoc(doc(this.firestore, 'Jobs', ref.id), {
        id: ref.id,
      });

      return jobref;
    
    } catch(err) {
      console.log(err);
    }
  }

  async deletejob(job: any): Promise<any> {
    try{
      const jobscollection = collection(this.firestore, 'Jobs');
      const ref = await deleteDoc(doc(jobscollection, job.id));
      return true;
    
    } catch(err) {
      console.log(err);
    }
    return false;
  }
}
