import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Helper } from './_helpers/helper';
import { User } from './_models';
import { AuthenticationService } from './_services';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit{
    currentUser: User;
    acessos: any;

    constructor(
        private router: Router,
        private title: Title,
        private authenticationService: AuthenticationService,
        private ngxLoader: NgxUiLoaderService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit(){
        this.ngxLoader.start();
        this.title.setTitle('GESCO')
        if(this.authenticationService.currentUserValue){
            this.colocaAcessosMenu()
        }
        this.ngxLoader.stop();
    }

    colocaAcessosMenu(){
        this.acessos = Helper.getMenuAcessos(this.authenticationService.currentUserValue.tipoUser);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}