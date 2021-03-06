import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticationService, PacienteService } from '@app/_services';
import { Helper } from '@app/_helpers/helper';
import { Paciente } from '@app/_models';
import { Title } from '@angular/platform-browser';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({ selector: 'app-paciente', templateUrl: 'paciente.component.html'})
export class CadastrarPacienteComponent implements OnInit {

  pacienteForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
     private router: Router,
     private title: Title,
     private paciente: PacienteService,
     private ngxLoader: NgxUiLoaderService,
     private authenticationService: AuthenticationService) {
        Helper.validaSessaoUsuario(this.authenticationService, this.router);
    }

    ngOnInit() {
        this.ngxLoader.start();
        if(this.isEdicao() === undefined) {
            this.title.setTitle('Cadastro Paciente | GESCO ');
          }
          else {
            this.title.setTitle('Editar Paciente | GESCO');
          }
        this.pacienteForm = this.isEdicao() ? this.criaFormEdicao(history.state.paciente) : this.criaFormVazio();
        this.ngxLoader.stop();
    }
    onSubmit(pacienteForm: NgForm) {
        this.ngxLoader.start();
        this.submitted = true;

        if (this.isFormInvalido()) {
          return;
        }

        if (this.isEdicao()) {
            this.updatePaciente(pacienteForm);
        }else{
            this.addPaciente(pacienteForm);
        }
        this.ngxLoader.stop();
    }
    updatePaciente(pacienteForm: NgForm) {
        this.paciente.updatePaciente(history.state.paciente.id, pacienteForm)
            .subscribe(res => {
                this.router.navigate(['paciente/consultar']);
            }, (err) => {
                console.log(err);
            });
    }

    addPaciente(pacienteForm: NgForm) {
        this.paciente.insertPaciente(pacienteForm)
            .subscribe(res => {
                this.router.navigate(['paciente/consultar']);
            }, (err) => {
                console.log(err);
            });
    }

    criaFormEdicao(paciente: Paciente){
        return this.formBuilder.group({
            nome: [paciente.nome, Validators.required],
            dtNascimento: [paciente.dtNascimento, Validators.required],
            sexo: [paciente.sexo, Validators.required],
            registry: [paciente.registry, Validators.required],
        });
    }

    criaFormVazio(){
        return this.formBuilder.group({
            nome: ['', Validators.required],
            dtNascimento: ['', Validators.required],
            sexo: ['', Validators.required],
            registry: ['', Validators.required],
        });
    }

    isEdicao(){
        return history.state.paciente;
    }

    isFormInvalido(){
        return this.pacienteForm.invalid;
    }

    get f() { return this.pacienteForm.controls; }

}
