import { Funcionario } from '@app/_models/funcionario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { AuthenticationService } from '@app/_services';
import { Helper } from '@app/_helpers/helper';
import { FuncionarioService } from '@app/_services/Funcionario.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({templateUrl: 'funcionario.component.html'})
export class CadastrarFuncionarioComponent implements OnInit {

    funcionarioForm: FormGroup;
    loading = false;
    submitted = false;
    acessoDev = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private title: Title,
        private authenticationService: AuthenticationService,
        private ngxLoader: NgxUiLoaderService,
        private funcionarioService: FuncionarioService
    ) {
        Helper.validaSessaoUsuario(this.authenticationService, this.router);
    }

    ngOnInit() {
      this.ngxLoader.start();
      if(this.isEdicao() === undefined) {
        this.title.setTitle('Cadastro Funcionário | GESCO ')
      }
      else {
        this.title.setTitle('Editar Funcionário | GESCO')
      }
      this.acessoDev = this.authenticationService.currentUserValue.tipoFuncionario === 0;
      this.funcionarioForm = this.isEdicao() ? this.criaFormEdicao(history.state.funcionario) : this.criaFormVazio();
      this.ngxLoader.stop();
    }
    get f() { return this.funcionarioForm.controls; }

    onSubmit(funcionarioForm: NgForm) {
      this.ngxLoader.start();
        this.submitted = true;
        if (this.funcionarioForm.invalid) {
            return;
        }
        this.isEdicao() ? this.updateFuncionario(funcionarioForm) : this.addFuncionario(funcionarioForm);
        this.ngxLoader.stop();
    }

    updateFuncionario(funcionarioForm: NgForm) {
      this.funcionarioService.updateFuncionario(history.state.funcionario.idFuncionario, funcionarioForm)
          .subscribe(res => {
              this.router.navigate(['funcionario/consultar']);
          }, (err) => {
              console.log(err);
          });
    }

    addFuncionario(funcionarioForm: NgForm) {
      this.funcionarioService.insertFuncionario(funcionarioForm)
          .subscribe(res => {
              this.router.navigate(['funcionario/consultar']);
          }, (err) => {
              console.log(err);
          });
    }

    criaFormEdicao(funcionario: Funcionario){
      return this.formBuilder.group({
          nome: [funcionario.nome, Validators.required],
          dtNascimento: [funcionario.dtNascimento, Validators.required],
          sexo: [funcionario.sexo, Validators.required],
          tipoFuncionario: [funcionario.tipoFuncionario, Validators.required],
          login: [funcionario.login, Validators.required],
          senha: [funcionario.senha, Validators.required],
          crmOuCrf: [funcionario.crmOuCrf, Validators.required],
          hospital: [{id: this.authenticationService.currentUserValue.funcionario.hospial.id}, Validators.required]
      });
    }

  criaFormVazio(){
      return this.formBuilder.group({
        nome: ['', Validators.required],
        tipoFuncionario: ['', Validators.required],
        login: ['', Validators.required],
        senha: ['', Validators.required],
        conselho: [this.authenticationService.currentUserValue.funcionario.conselho, Validators.required],
        hospial: [{id: this.authenticationService.currentUserValue.funcionario.hospial.id}, Validators.required]
      });
  }
    isEdicao(){
      return history.state.funcionario;
  }
}
