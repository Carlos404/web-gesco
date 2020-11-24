import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services';
import { AppComponent } from '@app/app.component';
import { Title } from '@angular/platform-browser';

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
    private title: Title,
    private authenticationService: AuthenticationService,
    private appComponent: AppComponent
  ) {

  }

  ngOnInit() {
    this.title.setTitle('Entrar | GESCO')
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
    this.authenticationService.login(this.f.usuario.value, this.f.senha.value)
      .pipe(first())
      .subscribe(
        () => {
          this.appComponent.colocaAcessosMenu();
          this.router.navigate([this.returnUrl]);
        },
        error => {
          switch (error.status) {
            case 404:
              this.error = 'Usuário não encontrado';
              break;
            case 401:
              this.error = 'Usuário ou senha incorretos';
              break;
            default:
              this.error = 'Falha no login, contate o administrador';
          }
          this.loading = false;

        });
  }
}
