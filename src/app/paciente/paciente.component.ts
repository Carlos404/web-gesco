import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticationService, PacienteService } from '@app/_services';
import { Helper } from '@app/_helpers/helper';

@Component({ selector: 'app-paciente', templateUrl: 'paciente.component.html'})
export class PacienteComponent implements OnInit {
  
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
        this.pacienteForm = this.criaFormVazio()
    }
    
    onSubmit(pacienteForm: NgForm) {
        this.submitted = true;
        if (this.isFormInvalido()) return;
        this.addPaciente(pacienteForm);
    }
        
    addPaciente(pacienteForm: NgForm) {
        this.paciente.insertPaciente(pacienteForm)
            .subscribe(res => {
                this.router.navigate(['/home']);
            }, (err) => {
                console.log(err);
            });
    }
    
    criaFormVazio(){
        return this.formBuilder.group({
            nome: ['', Validators.required],
            dt_nascimento: ['', Validators.required],
            sexo: ['', Validators.required],
            cd_paciente: ['3'],
        });
    }

    isFormInvalido(){
        return this.pacienteForm.invalid;
    }
            
    get f() { return this.pacienteForm.controls; }

}
