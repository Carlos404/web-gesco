import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/_services';
import { Helper } from '@app/_helpers/helper';
import { Funcionario } from '@app/_models/funcionario';
import { FuncionarioService } from '@app/_services/Funcionario.service';
import { ModalConsultaFuncionario } from '../modal/modalConsultaRegistroFuncionario.component';
import { Cargo } from '@app/enum/cargo';
import { Title } from '@angular/platform-browser';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({ selector: 'app-funcionario', templateUrl: './funcionario.component.html' })
export class ConsultarFuncionarioComponent implements OnInit, AfterViewInit {

  order: string = 'nome';
  reverse: boolean = false;

  @ViewChildren('resultadosFuncionario') things: QueryList<any>;

  KEY_NOME = 'nome';

  funcionarios: Funcionario[];
  funcionario: Funcionario;

  funcionarioForm: FormGroup;
  submitted = false;
  verify: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private title: Title,
    private ngxLoader: NgxUiLoaderService,
    private funcionarioService: FuncionarioService,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal) {
    Helper.validaSessaoUsuario(this.authenticationService, this.router);
  }

  ngOnInit(): void {
    this.ngxLoader.start();
    this.title.setTitle('Funcionários | GESCO')
    this.consultaTodosFuncionarios();
    this.funcionarioForm = this.criaFormVazio();
    this.ngxLoader.stop();
  }

  onSubmit(funcionarioForm: NgForm) {
    this.submitted = true;
    funcionarioForm[this.KEY_NOME] ? this.consultaFuncionario(funcionarioForm[this.KEY_NOME]) : this.consultaTodosFuncionarios();
  }

  consultaTodosFuncionarios() {

    this.funcionarioService.getAllFuncionarios().toPromise()
      .then(data => {
        if (data) {
          this.manipulaRetorno(data);
        }
      });
  }

  consultaFuncionario(id) {
    this.funcionarioService.getFuncionario(id).toPromise()
      .then(data => {
        if (data) {
          this.manipulaRetorno(data);
        } else {
          document.getElementById('resultado').classList.add('d-none');
          alert('Funcionário não encontrado');
        }
      });
  }

  setOrder(order) {
    if (this.order === order) {
      this.reverse = !this.reverse;
    }

    this.order = order;
  }

  private manipulaRetorno(data: Funcionario[]) {
    this.funcionarios = data;

    this.funcionarios = this.funcionarios.filter(funcionario => this.removeDesenvolvedoresDaLista(funcionario));
    this.funcionarios.forEach(funcionario => {
      this.funcionario = funcionario;
      this.funcionario.jsonFuncionario = JSON.stringify(funcionario);
    });
  }

  removeDesenvolvedoresDaLista(funcionario: Funcionario) {
    const cargoDesenvolvedor = Cargo.cargos.DESENVOLVEDOR.id;

    if (this.authenticationService.currentUserValue.tipoFuncionario === cargoDesenvolvedor) {
      return true;
    }
    if (funcionario.tipoFuncionario.toString() !== cargoDesenvolvedor.toString()) {
      return true;
    }

  }

  ngAfterViewInit() {
    this.things.changes.subscribe(t => {
      this.ngForRendred();
    });
  }

  ngForRendred() {
    this.removeDisplayNoneNaTabelaResultados();
    if (this.verify === false) {
      this.aplicaEventoDeClickConsultarRegistro();
    }
  }

  aplicaEventoDeClickConsultarRegistro() {
    this.verify = true;
    document.querySelectorAll('.resultado')
      .forEach(resultado =>
        resultado.addEventListener('click', () => this.open(resultado.getAttribute('data-json-funcionario')))
      );
  }

  open(jsonFuncionario) {
    this.modalService.open(ModalConsultaFuncionario, { size: 'lg', }).componentInstance.jsonFuncionario = jsonFuncionario;
  }

  removeDisplayNoneNaTabelaResultados() {
    if (document.getElementById('resultado').classList.contains('d-none')) {
      document.getElementById('resultado').classList.remove('d-none');
    }
  }

  criaFormVazio() {
    return this.formBuilder.group({
      nome: ['', Validators.required],
    });
  }
}
