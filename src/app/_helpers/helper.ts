import { AuthenticationService } from '@app/_services';
import { Router } from '@angular/router';
import { Cargo } from '@app/enum/cargo';

export class Helper{
    
    static validaSessaoUsuario(authenticationService : AuthenticationService, router : Router){
        if (!authenticationService.currentUserValue) { 
            router.navigate(['/']);
          }
    }

    static getMenuAcessos(cargo: any){
        let aux: any;
        aux = Object.values(Cargo.cargos).find(a=> (a.id == cargo)).acessos
        
        if(!aux.length){
            let arrayAux: any[] = [];
            arrayAux.push(aux) 
            
            return arrayAux;
        }

        return aux;
    }
    
}