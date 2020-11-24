import { Funcionario } from '@app/_models/funcionario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { AuthenticationService } from '@app/_services';
import { Helper } from '@app/_helpers/helper';
import { FuncionarioService } from '@app/_services/Funcionario.service';

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
        private funcionarioService: FuncionarioService
    ) {
        Helper.validaSessaoUsuario(this.authenticationService, this.router);
    }

    ngOnInit() {
      if(this.isEdicao() === undefined) {
        this.title.setTitle('Cadastro Funcionário | GESCO ')
      }
      else {
        this.title.setTitle('Editar Funcionário | GESCO')
      }
      this.acessoDev = this.authenticationService.currentUserValue.tipoUser === 0;
      this.funcionarioForm = this.isEdicao() ? this.criaFormEdicao(history.state.funcionario) : this.criaFormVazio();
    }
    get f() { return this.funcionarioForm.controls; }

    onSubmit(funcionarioForm: NgForm) {
        this.submitted = true;
        if (this.funcionarioForm.invalid) {
            return;
        }
        this.isEdicao() ? this.updateFuncionario(funcionarioForm) : this.addFuncionario(funcionarioForm);
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
          nameUser: [funcionario.nameUser, Validators.required],
          senha: [funcionario.senha, Validators.required],
          crmOuCrf: [funcionario.crmOuCrf, Validators.required],
          hospital: [{id: this.authenticationService.currentUserValue.hospital}, Validators.required]
      });
    }

  criaFormVazio(){
      return this.formBuilder.group({
        nome: ['', Validators.required],
        dtNascimento: ['', Validators.required],
        sexo: ['', Validators.required],
        tipoFuncionario: ['', Validators.required],
        nameUser: ['', Validators.required],
        senha: ['', Validators.required],
        crmOuCrf: ['', Validators.required],
        hospital: [{id: this.authenticationService.currentUserValue.hospital}, Validators.required]
      });
  }
    isEdicao(){
      return history.state.funcionario;
  }
}
