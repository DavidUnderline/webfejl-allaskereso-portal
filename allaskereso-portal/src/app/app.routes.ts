import { Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { guardsGuard, publisGuard } from './shared/guards.guard';

export const routes: Routes = [
    // {
    //     path: 'profile',
    //     loadComponent: () => import('./pages/profile/profile.component').then(l => l.ProfileComponent)
    // },
    { path: 'home', component: HomeComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [guardsGuard] },
    { path: 'login', component: LoginComponent, canActivate: [publisGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [publisGuard] },
    { path: 'jobs', component: JobsComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: HomeComponent }
];
