import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Helper } from './_helpers/helper';
import { User } from './_models';
import { AuthenticationService } from './_services';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit{
    currentUser: User;
    acessos: any;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit(){
        if(this.authenticationService.currentUserValue){
            this.colocaAcessosMenu()
        }
    }

    colocaAcessosMenu(){
        this.acessos = Helper.getMenuAcessos(this.authenticationService.currentUserValue.tipoUser);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}