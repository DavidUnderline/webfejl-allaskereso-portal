import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { DataService } from '../../data.service';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  standalone: true
})

export class ProfileComponent implements OnInit{
  profileform: FormGroup;

  constructor(
    private snackBar: MatSnackBar, private userservice: UserService, private loginservice: LoginService, private dataservice: DataService, private router: Router, private formbuilder: FormBuilder){
    this.profileform = this.formbuilder.group({
      name: ['', [Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      // password: ['', [Validators.required, Validators.minLength(3)]],
      cv: [''],
    });
  }

  errormsg() {
    if (this.profileform.controls['name'].hasError('required') || this.profileform.controls['name'].hasError('name')) {
      return 'Invalid input';
    
    } 
    // else if (this.profileform.controls['password'].hasError('required') || this.profileform.controls['password'].hasError('password')) {
    //   return 'Invalid input';
    // } 
    
     else if (this.profileform.controls['email'].hasError('required') || this.profileform.controls['email'].hasError('email')) {
      return 'Invalid input';
    
    } else if (this.profileform.controls['cv'].hasError('required') || this.profileform.controls['cv'].hasError('cv')) {
      return 'Invalid input';
    }

    return '';
  }

  // editresponse() {
  //   return 'edit response';
  // }

  onsubmit(){
    const data = this.profileform.value;
    
    if(this.profileform.invalid){
      this.snackBar.open("Invalid input", "", { duration: 2000, panelClass: ['my-snackbar-class'] });
      return;
    }
    
    if(this.profileform.value.name === localStorage.getItem('name') && 
      this.profileform.value.email === localStorage.getItem('email') && 
      this.profileform.value.cv === localStorage.getItem('cv')
    ){
      this.snackBar.open("There' nothing to change", "", { 
        duration: 2000, 
        panelClass: ['my-snackbar-class'] 
      });
      return;
    }

    let temp = false;
    if(this.profileform.value.email !== localStorage.getItem('email')) {
      temp = true;
    }
    
    this.userservice.updateuserdata(localStorage.getItem('id') as string, this.profileform.value)
    .then(() => {
      this.snackBar.open("Successfully updated", "", { duration: 2000, panelClass: ['my-snackbar-class'] });
    })
    .catch((err) => {
      this.snackBar.open("Error while updating", "", { duration: 2000, panelClass: ['my-snackbar-class'] });
      console.log(err);
    });

  }

  profile: any = {};
  private subscription: Subscription | null = null;

  ngOnInit(): void{
    this.subscription = this.userservice.getUserData().subscribe({
      next: (data) => {
        console.log(data);

        this.profile = data;
        
        if(this.profile === null) {
          this.loginservice.signout();
          this.router.navigate(['/home']);
          return; 
          
        } else if(data.iscompany) {
          // console.log("company");
          
        } else if(!data.iscompany) {
          // console.log("jobseeker");
          this.profileform.controls['cv'].setValue(this.profile.cv);
        }
        
        this.profileform.controls['name'].setValue(this.profile.name);
        this.profileform.controls['email'].setValue(this.profile.email);
        this.dataservice.update2(this.profile.iscompany);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}