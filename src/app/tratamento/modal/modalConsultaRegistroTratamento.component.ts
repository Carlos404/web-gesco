import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tratamento } from '@app/_models/tratamento';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({templateUrl: 'modalConsultaRegistroTratamento.component.html'})
  export class ModalConsultaTratamento implements OnInit {

    tratamento: Tratamento = new Tratamento();
    jsonTratamento: string;

    constructor(public activeModal: NgbActiveModal,
                private router: Router) { }

    ngOnInit() {
      this.tratamento = JSON.parse(this.jsonTratamento);
    }

    redirecionaTelaEdicao(){
      this.router.navigate(['funcionario/cadastrar'], {state: {funcionario: this.tratamento}});
    }

  }
