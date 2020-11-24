import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    nomeUsuario: string;
    constructor(
        private authenticationService: AuthenticationService,
        private title: Title) { }

    ngOnInit() {
        this.title.setTitle('GESCO')
        this.loading = false;
        this.nomeUsuario = this.authenticationService.currentUserValue.nome;
    }
}
