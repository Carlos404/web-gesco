import { state } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Paciente } from '@app/_models';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: './modalConsultaRegistroPaciente.component.html'
  })
  export class ModalConsultaPaciente {
    paciente: Paciente = { id: null, nome: '', sexo: '', dtNascimento: null , cd_paciente: null };
    jsonPaciente: String;

    constructor(public activeModal: NgbActiveModal, private router: Router) {
    }

    ngOnInit() {      
      this.jsonPaciente = JSON.stringify(this.paciente);
    }

    redirecionaTelaEdicao(){
      this.router.navigate(['paciente/cadastrar'], {state: {paciente: this.paciente}})
    }
  
  }