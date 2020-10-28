import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { AuthenticationService, UserService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    nomeUsuario: string;
    constructor(private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.loading = false;
        this.nomeUsuario = this.authenticationService.currentUserValue.nome;
    }
}
