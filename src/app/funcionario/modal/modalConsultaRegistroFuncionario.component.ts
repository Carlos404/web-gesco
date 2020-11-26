import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Funcionario } from '@app/_models/funcionario';

@Component({templateUrl: './modalConsultaRegistroAntibiotico.component.html'})
  export class ModalConsultaFuncionario implements OnInit {

    funcionario: Funcionario = new Funcionario();
    jsonFuncionario: string;

    constructor(public activeModal: NgbActiveModal,
                private router: Router) { }

    ngOnInit() {
      this.funcionario = JSON.parse(this.jsonFuncionario);
    }

    redirecionaTelaEdicao(){
      this.router.navigate(['funcionario/cadastrar'], {state: {funcionario: this.funcionario}});
    }

  }
