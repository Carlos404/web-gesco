import { AuthenticationService } from '@app/_services';
import { Router } from '@angular/router';

export class Helper{
    
    static validaSessaoUsuario(authenticationService : AuthenticationService, router : Router){
        if (!authenticationService.currentUserValue) { 
            router.navigate(['/']);
          }
    }
    
}