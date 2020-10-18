import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Antibiotico } from '@app/_models/antibiotico';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: './modalConsultaRegistroAntibiotico.component.html'
  })
  export class ModalConsultaAntibiotico {
    antibiotico: Antibiotico = new Antibiotico();
    jsonAntibiotico: string;

    constructor(public activeModal: NgbActiveModal, private router: Router) {
    }

    ngOnInit() {
      this.antibiotico = JSON.parse(this.jsonAntibiotico);
    }

    redirecionaTelaEdicao(){
      this.router.navigate(['antibiotico/cadastrar'], {state: {antibiotico: this.antibiotico}})
    }
  
  }