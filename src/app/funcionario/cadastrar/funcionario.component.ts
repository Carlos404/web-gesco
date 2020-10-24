import { Funcionario } from '@app/_models/funcionario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { AuthenticationService } from '@app/_services';
import { Helper } from '@app/_helpers/helper';
import { FuncionarioService } from '@app/_services/Funcionario.service';

@Component({templateUrl: 'funcionario.component.html'})
export class CadastrarFuncionarioComponent implements OnInit {
    funcionarioForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private funcionarioService: FuncionarioService
    ) {
        Helper.validaSessaoUsuario(this.authenticationService, this.router);
    }

    ngOnInit() {
      this.funcionarioForm = this.isEdicao() ? this.criaFormEdicao(history.state.funcionario) : this.criaFormVazio();
    }
    get f() { return this.funcionarioForm.controls; }

    onSubmit(funcionarioForm: NgForm) {
        this.submitted = true;
        if (funcionarioForm.invalid) {
            return;
        }
        this.isEdicao() ? this.updateFuncionario(funcionarioForm) : this.addFuncionario(funcionarioForm);
    }

    updateFuncionario(funcionarioForm: NgForm) {
      console.log(funcionarioForm)
      this.funcionarioService.updateFuncionario(history.state.funcionario.idFuncionario, funcionarioForm)
          .subscribe(res => {
              this.router.navigate(['funcionario/consultar']);
          }, (err) => {
              console.log(err);
          });
    }

    addFuncionario(funcionarioForm: NgForm) {
      console.log(funcionarioForm)
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
          hospital: {id: this.authenticationService.currentUserValue.hospital}
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
        hospital: {id: this.authenticationService.currentUserValue.hospital}
      });
  }
    isEdicao(){
      return history.state.funcionario;
  }

}
