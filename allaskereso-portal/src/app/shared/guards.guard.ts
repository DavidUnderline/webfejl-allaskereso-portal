import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { map, take } from 'rxjs';
import { inject } from '@angular/core';

export const guardsGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loginservice = inject(LoginService);
  
  return loginservice.currentUser.pipe(
    take(1),
    map(user => {
      if(!user){
        router.navigate(['/home']);
        return false;
      }
      
      return true;
    })
  );
};

export const publisGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loginservice = inject(LoginService);

  return loginservice.currentUser.pipe(
    take(1),
    map(user => {
      if(!user){
        return true;
      }

      router.navigate(['/home']);
      return false;
    })
  );
};
