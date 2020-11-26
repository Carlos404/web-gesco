import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cargo } from '@app/enum/cargo';
import { Helper } from '@app/_helpers/helper';
import { Tratamento } from '@app/_models/Tratamento';
import { AuthenticationService } from '@app/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConsultaTratamento } from '../modal/modalConsultaRegistroTratamento.component';
import { TratamentoService } from './../../_services/tratamento.service';
import { Title } from '@angular/platform-browser';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({ selector: 'app-consulta-tratamento', templateUrl: 'tratamento.component.html' })
export class ConsultarTratamentoComponent implements OnInit, AfterViewInit  {

  order: string = 'paciente';
  reverse: boolean = false;
  verify: boolean = false;

  @ViewChildren('resultadosTratamento') things: QueryList<any>;

  KEY_NOME = 'nome';

  tratamentos: Tratamento[];
  tratamento: Tratamento;

  tratamentoForm: FormGroup;
  submitted = false;
  isMedico = false;
  isDesenvolvedor = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private title: Title,
              private tratamentoService: TratamentoService,
              private ngxLoader: NgxUiLoaderService,
              private authenticationService: AuthenticationService,
              private modalService: NgbModal) {
       Helper.validaSessaoUsuario(this.authenticationService, this.router);
   }

  ngOnInit(): void {
    this.ngxLoader.start();
    this.title.setTitle('Tratamentos | GESCO ');
    this.consultaTodosTratamentos();
    this.tratamentoForm = this.criaFormVazio();
    this.isMedico = this.authenticationService.currentUserValue.tipoUser === Cargo.cargos.MEDICO.id;
    this.isDesenvolvedor = this.authenticationService.currentUserValue.tipoUser === Cargo.cargos.DESENVOLEDOR.id;
    this.ngxLoader.stop();
  }

  onSubmit(tratamentoForm: NgForm) {
    this.submitted = true;
    tratamentoForm[this.KEY_NOME] ? this.consultaTratamento(tratamentoForm[this.KEY_NOME]) : this.consultaTodosTratamentos();
  }

  consultaTodosTratamentos() {

    this.tratamentoService.getAllTratamentos().toPromise()
        .then(data => {
          if (data){
            this.manipulaRetorno(data);
          }
        });
  }

  consultaTratamento(id) {
    this.tratamentoService.getTratamento(id).toPromise()
        .then(data => {
          if (data){
            this.manipulaRetorno(data);
          }else{
            document.getElementById('resultado').classList.add('d-none');
            alert('Tratamento não encontrado');
          }
        });
  }
  private manipulaRetorno(data: Tratamento[]) {
    this.tratamentos = data;

    this.tratamentos.forEach(tratamento => {
      tratamento.jsonTratamento = JSON.stringify(tratamento);
    });
  }

  ngAfterViewInit() {
    this.things.changes.subscribe(t => {
      this.ngForRendred();
    });
  }

  ngForRendred() {
    this.removeDisplayNoneNaTabelaResultados();
    if(this.verify === false) {
      this.aplicaEventoDeClickConsultarRegistro();
    }
  }

  aplicaEventoDeClickConsultarRegistro(){
    this.verify = true;
    document.querySelectorAll('.resultado')
            .forEach(resultado =>
                     resultado.addEventListener('click', () => this.open(resultado.getAttribute('data-json-tratamento')))
    );
  }

  open(jsonTratamento) {
    this.modalService.open(ModalConsultaTratamento, { size: 'lg', }).componentInstance.jsonTratamento = jsonTratamento;
  }

  removeDisplayNoneNaTabelaResultados() {
    if (document.getElementById('resultado').classList.contains('d-none')) {
      document.getElementById('resultado').classList.remove('d-none');
    }
  }

  criaFormVazio(){
    return this.formBuilder.group({
        nome: ['', Validators.required],
    });
  }

  setOrder(order) {
    if (this.order === order) {
      this.reverse = !this.reverse;
    }

    this.order = order;
  }
}
