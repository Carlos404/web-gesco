import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Prescricao } from '@app/_models/prescricao';
import { PrescricaoService } from '@app/_services/prescricao.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ModalRecusaComponent } from '../modal/modal-recusa/modal-recusa.component';

@Component({
  selector: 'app-prescricao',
  templateUrl: './prescricao.component.html',
  styleUrls: ['./prescricao.component.css']
})
export class ConsultarPrescricaoComponent implements OnInit {


  userFilter: any = { nomeAntibiotico: '' };
  order: string = '';
  selected: string;
  reverse: boolean = false;
  @ViewChildren('resultadosPrescricao') things: QueryList<any>;


  prescricao: Prescricao = { idPrescricao: null, descDescricao: '', diasTratamento: '', dosagemDiaria: '', idAntibiotico: null, periodiociadade: '', jsonPrescricao: '' };

  prescricoes: Prescricao[];

  prescricaoForm: FormGroup;

  verify: boolean = false;
  public orderSelect;

  constructor(
    private formBuilder: FormBuilder,
    private title: Title,
    private ngxLoader: NgxUiLoaderService,
    private prescricaooService: PrescricaoService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.ngxLoader.start();
    this.title.setTitle('Prescrições | GESCO ')
    this.getAllPrescricao();
    this.ngxLoader.stop();
    this.prescricaoForm = this.criaFormVazio();
  }

  getAllPrescricao() {
    this.prescricaooService.getAllPrescricoes()
      .toPromise()
      .then(data => {
        this.prescricoes = data;

        this.prescricoes
          .forEach(prescricao => {
            this.prescricao = prescricao;
            this.prescricao.jsonPrescricao = JSON.stringify(prescricao);
          })
      })
  }

  setOrder(order) {
    this.order = order;
  }

  criaFormVazio() {
    return this.formBuilder.group({
      nome: ['', Validators.required],
    });
  }

  updatePrescricao(id, status) {
    this.prescricaooService.updatePrescricao(id, status)
      .subscribe(res => {
      }, (err) => {
        console.log(err);
      });
  }

  ngAfterViewInit() {
    this.things.changes.subscribe(t => {
      this.ngForRendred();
    })
  }

  ngForRendred() {
    this.removeDisplayNoneNaTabelaResultados();
    if (this.verify === false) {
      this.aplicaEventoDeClickConsultarRegistro();
    }
  }

  aplicaEventoDeClickConsultarRegistro() {
    this.verify = true;
    document.querySelectorAll(".resultado")
      .forEach(resultado =>
        resultado.addEventListener("click", () => this.open(resultado.getAttribute("data-json-prescricao")))
      );
  }

  open(jsonPrescricao) {
    this.modalService.open(ModalRecusaComponent, { size: 'lg', }).componentInstance.jsonPrescricao = jsonPrescricao;
  }

  removeDisplayNoneNaTabelaResultados() {
    if (document.getElementById("resultado").classList.contains("d-none"))
      document.getElementById("resultado").classList.remove("d-none");
  }
}
