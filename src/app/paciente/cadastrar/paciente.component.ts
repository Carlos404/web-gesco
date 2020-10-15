import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticationService, PacienteService } from '@app/_services';
import { Helper } from '@app/_helpers/helper';
import { Paciente } from '@app/_models';

@Component({ selector: 'app-paciente', templateUrl: 'paciente.component.html'})
export class CadastrarPacienteComponent implements OnInit {
  
  pacienteForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
     private router: Router,
     private paciente: PacienteService,
     private authenticationService: AuthenticationService) {
        Helper.validaSessaoUsuario(this.authenticationService, this.router);
    }

    ngOnInit() {
        this.pacienteForm = this.isEdicao() ? this.criaFormEdicao(history.state.paciente) : this.criaFormVazio();
    }
    
    onSubmit(pacienteForm: NgForm) {
        this.submitted = true;
        if (this.isFormInvalido()) return;
        if(this.isEdicao()) {
            this.updatePaciente(pacienteForm);
        }else{
            this.addPaciente(pacienteForm);
        }
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
            sexo: [this.getSexo(paciente.sexo), Validators.required],
            cd_paciente: [paciente.cd_paciente],
        });
    }

    criaFormVazio(){
        return this.formBuilder.group({
            nome: ['', Validators.required],
            dtNascimento: ['', Validators.required],
            sexo: ['', Validators.required],
            cd_paciente: ['3'],
        });
    }

    getSexo(sexo: String){
        return "Masculino" == sexo ? "1" : "2"
    }

    isEdicao(){
        return history.state.paciente;
    }

    isFormInvalido(){
        return this.pacienteForm.invalid;
    }
            
    get f() { return this.pacienteForm.controls; }

}
