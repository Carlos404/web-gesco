import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalAviso } from '@app/modals/modal-aviso.component';
import { Antibiotico } from '@app/_models/antibiotico';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: './modalConsultaRegistroAntibiotico.component.html'
  })
  export class ModalConsultaAntibiotico {
    antibiotico: Antibiotico = new Antibiotico();
    jsonAntibiotico: string;

    constructor(public activeModal: NgbActiveModal, private router: Router, private modalService: NgbModal) {
    }

    ngOnInit() {
      this.antibiotico = JSON.parse(this.jsonAntibiotico);
    }

    redirecionaTelaEdicao(){
      this.router.navigate(['antibiotico/cadastrar'], {state: {antibiotico: this.antibiotico}})
    }

    open() {
      this.modalService.open(ModalAviso, { windowClass: "mt-5"}).componentInstance.antibiotico = this.antibiotico;
    }
  
  }