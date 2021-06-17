import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PrescricaoService } from '@app/_services/prescricao.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: 'modal-recusa.component.html',
})
export class ModalRecusaComponent implements OnInit {
  jsonPrescricao;
  prescricaoRecusaForm: FormGroup;
  status: string = '2';

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private prescricaooService: PrescricaoService, private router: Router) { }

  ngOnInit() {

    this.prescricaoRecusaForm = this.criaFormVazio();
  }

  redirecionaTelaEdicao() {
    this.prescricaooService.updatePrescricao(this.jsonPrescricao, this.status, this.prescricaoRecusaForm.value.recusa)
      .subscribe(res => {
      }, (err) => {
        console.log(err);
      });
    this.router.navigate(['/paciente/consultar']);
  }

  criaFormVazio() {
    return this.formBuilder.group({
      recusa: ['', Validators.required],
    })
  };
}
