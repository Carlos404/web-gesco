import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Antibiotico } from '@app/_models/antibiotico';
import { Tratamento } from '@app/_models/Tratamento';
import { AuthenticationService } from '@app/_services';
import { AntibioticoService } from '@app/_services/antibiotico.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TratamentoService } from './../_services/tratamento.service';

@Component({templateUrl: './modal-aviso.component.html'})
  export class ModalAviso {

    antibiotico: Antibiotico;
    tratamento: Tratamento;
    origemTratamento = false;
    aprovacaoTratamento = false;

    constructor(private modalService: NgbModal,
                public activeModal: NgbActiveModal,
                private antibioticoService: AntibioticoService,
                private authenticationService: AuthenticationService,
                private tratamentoService: TratamentoService,
                private router: Router) {}

    excluiAntibiotico(){
        this.antibioticoService.deleteAntibiotico(this.antibiotico.id)
            .toPromise().then(data => window.location.reload());
    }

    atualizaTratamento(tratamentoAprovado){
      const idTratamento = this.tratamento.id;

      this.tratamento.statusTratamento = tratamentoAprovado ? 2 : 1;

      this.tratamento.funcionario = {
        idFuncionario: this.authenticationService.currentUserValue.id
      };

      this.tratamento.paciente = {
        id: this.tratamento.pacienteId
      };

      delete this.tratamento.id;
      console.log(this.tratamento)
      this.tratamentoService.updateTratamento(idTratamento, this.tratamento)
            .subscribe(res => {
                this.router.navigate(['tratamento/consultar']);
            }, (err) => {
                console.log(err);
            });
      }

  }
