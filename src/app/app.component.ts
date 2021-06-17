import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Helper } from './_helpers/helper';
import { User } from './_models';
import { AuthenticationService } from './_services';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
    currentUser: User;
    acessos: any;

    constructor(
        private router: Router,
        private title: Title,
        private authenticationService: AuthenticationService,
        private ngxLoader: NgxUiLoaderService,
        private metaService: Meta) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit() {
        this.metaService.addTags([
            { httpEquiv: 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
            { httpEquiv: 'Cache-control', content: 'public' },
            { name: 'keywords', content: 'gesco, gestão, antibiotico' },
            { name: 'description', content: 'Gesco - Gestão de Antibióticos' },
            { name: 'robots', content: 'index, follow' },
            { name: 'referrer', content: 'origin' },
            { name: 'theme-color', content: '#487eb0' },
            { property: 'og:locale', content: 'pt_BR' },
            { property: 'og:image', content: 'https://i.imgur.com/535gZhC.png' },
            { property: 'og:og:image:secure_ssl', content: 'https://i.imgur.com/535gZhC.png' },
            { property: 'og:title', content: 'GESCO' },
            { property: 'og:description', content: 'Gesco - Gestão de Antibióticos' },
        ]);
        this.ngxLoader.start();
        this.title.setTitle('GESCO - Gestão de antibióticos')
        if (this.authenticationService.currentUserValue) {
            this.colocaAcessosMenu()
        }
        this.ngxLoader.stop();
    }

    colocaAcessosMenu() {
        this.acessos = Helper.getMenuAcessos(this.authenticationService.currentUserValue.funcionario.tipoFuncionario);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}