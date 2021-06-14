import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cargo } from '@app/enum/cargo';
import { ModalAviso } from '@app/modals/modal-aviso.component';
import { Tratamento } from '@app/_models/Tratamento';
import { AuthenticationService } from '@app/_services';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({templateUrl: 'modalConsultaRegistroTratamento.component.html'})
  export class ModalConsultaTratamento implements OnInit {

    tratamento: Tratamento = new Tratamento();
    jsonTratamento: string;
    isMedico = false;
    isFarmaceutico = false;
    isDesenvolvedor = false;

    constructor(public activeModal: NgbActiveModal,
                private authenticationService: AuthenticationService,
                private router: Router,
                private modalService: NgbModal) { }

    ngOnInit() {

      this.isMedico = this.authenticationService.currentUserValue.funcionario.tipoFuncionario === Cargo.cargos.MEDICO.nome;
      this.isFarmaceutico = this.authenticationService.currentUserValue.funcionario.tipoFuncionario === Cargo.cargos.FARMACEUTICO.nome;
      this.isDesenvolvedor = this.authenticationService.currentUserValue.funcionario.tipoFuncionario === Cargo.cargos.DESENVOLVEDOR.nome;
      this.tratamento = JSON.parse(this.jsonTratamento);
      console.log(this.tratamento)
    }

    redirecionaTelaEdicao(){
      console.log(this.tratamento)
      this.router.navigate(['tratamento/cadastrar'], {state: {tratamento: this.tratamento}});
    }

    open(aprovacao) {
      const componentInstance = this.modalService.open(ModalAviso, { windowClass: 'mt-5'}).componentInstance;
      componentInstance.tratamento = this.tratamento;
      componentInstance.origemTratamento = true;
      componentInstance.aprovacaoTratamento = aprovacao;
    }

  }
