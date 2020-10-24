import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Antibiotico } from '@app/_models/antibiotico';
import { AntibioticoService } from '@app/_services/antibiotico.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({templateUrl: './modal-aviso.component.html'})
  export class ModalAviso { 

    antibiotico: Antibiotico;

    constructor(private modalService: NgbModal, 
        public activeModal: NgbActiveModal,
        private antibioticoService: AntibioticoService,
        private router: Router) {}
  
    excluiAntibiotico(){
        this.antibioticoService.deleteAntibiotico(this.antibiotico.id)
            .toPromise().then(data => window.location.reload());
    }

  }