import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AuthenticationService } from '@app/_services';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    nomeUsuario: string;
    constructor(
        private authenticationService: AuthenticationService,
        private title: Title,
        private ngxLoader: NgxUiLoaderService) { }



    ngOnInit() {
        this.ngxLoader.start();
        this.title.setTitle('GESCO')
        this.loading = false;
        this.nomeUsuario = this.authenticationService.currentUserValue.nome;
        this.ngxLoader.stop();
    }
}
