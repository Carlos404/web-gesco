import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Paciente } from '@app/_models';
import { Tratamento } from '@app/_models/Tratamento';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: './modalConsultaRegistroPaciente.component.html'
  })
  export class ModalConsultaPaciente {
    paciente: Paciente = { id: null, nome: '', sexo: '', dataNascimento: null , registro: null, hospital: '', jsonPaciente:'' };
    jsonPaciente: string;

    constructor(public activeModal: NgbActiveModal, private router: Router) {
    }

    ngOnInit() {
      this.paciente = JSON.parse(this.jsonPaciente);
    }
    redirecionaTelaEdicaoTratamento(){
      this.router.navigate(['/tratamento/cadastrar'], {state: {paciente: this.paciente}})
    }

    redirecionaTelaEdicao(){
      this.router.navigate(['paciente/cadastrar'], {state: {paciente: this.paciente}})
    }
  
  }