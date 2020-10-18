import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService, UserService } from '@app/_services';
import { AppComponent } from '@app/app.component';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private appComponent: AppComponent
    ) { 
        
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            usuario: ['', Validators.required],
            senha: ['', Validators.required]
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.getUser(this.f.usuario.value, this.f.senha.value)
            .pipe(first())
            .subscribe(
                () => {
                    this.appComponent.colocaAcessosMenu();
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}
