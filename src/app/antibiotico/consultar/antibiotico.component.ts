import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/_services';
import { Helper } from '@app/_helpers/helper';
import { AntibioticoService } from '@app/_services/antibiotico.service';
import { Antibiotico } from '@app/_models/antibiotico';
import { ModalConsultaAntibiotico } from '../modal/modalConsultaRegistroAntibiotico.component';
import { Title } from '@angular/platform-browser';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FilterPipe } from 'ngx-filter-pipe';

@Component({ selector: 'app-antibiotico', templateUrl: './antibiotico.component.html' })
export class ConsultarAntibioticoComponent implements OnInit {

  userFilter: any = { nome: '' };
  order: string = '';
  selected: string;
  reverse: boolean = false;
  verify: boolean = false;

  @ViewChildren('resultadosAntibiotico') things: QueryList<any>;

  antibioticos: Antibiotico[];
  antibiotico: Antibiotico;

  antibioticoForm: FormGroup;
  submitted = false;

  public orderSelect;
  constructor(
    private title: Title,
    private router: Router,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private ngxLoader: NgxUiLoaderService,
    private antibioticoService: AntibioticoService,
    private authenticationService: AuthenticationService,
  ) {
    Helper.validaSessaoUsuario(this.authenticationService, this.router);
  }

  ngOnInit(): void {
    this.ngxLoader.start();
    this.title.setTitle('Antibióticos | GESCO ')
    this.consultaTodosAntibioticos();
    this.antibioticoForm = this.criaFormVazio();
    this.ngxLoader.stop();
  }

  onSubmit(antibioticoForm: NgForm) {
    this.submitted = true;
    antibioticoForm['nome'] ? this.consultaAntibiotico(antibioticoForm['nome']) : this.consultaTodosAntibioticos();
  }

  consultaTodosAntibioticos() {
    this.antibioticoService.getAllAntibioticos().toPromise()
      .then(data => {
        if (data) {
          this.antibioticos = data;

          this.antibioticos.forEach(antibiotico => {
            this.antibiotico = antibiotico;
            this.antibiotico.jsonAntibiotico = JSON.stringify(antibiotico);
          });
        }
      })
  }

  consultaAntibiotico(id) {
    this.antibioticoService.getAntibiotico(id).toPromise()
      .then(data => {
        if (data) {
          this.antibioticos = data;

          this.antibioticos.forEach(antibiotico => {
            this.antibiotico = antibiotico;
            this.antibiotico.jsonAntibiotico = JSON.stringify(antibiotico);
          });
        } else {
          document.getElementById("resultado").classList.add("d-none")
          alert("Antibiótico não encontrado");
        }
      });
  }

  setOrder(order) {
    if (this.order === order) {
      this.reverse = !this.reverse;
    }
    this.order = order;
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
        resultado.addEventListener("click", () => this.open(resultado.getAttribute("data-json-antibiotico")))
      );
  }

  open(jsonAntibiotico) {
    this.modalService.open(ModalConsultaAntibiotico, { size: 'lg', }).componentInstance.jsonAntibiotico = jsonAntibiotico;
  }

  removeDisplayNoneNaTabelaResultados() {
    if (document.getElementById("resultado").classList.contains("d-none"))
      document.getElementById("resultado").classList.remove("d-none");
  }

  criaFormVazio() {
    return this.formBuilder.group({
      nome: ['', Validators.required],
    });
  }
}
