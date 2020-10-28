import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/_services';
import { Helper } from '@app/_helpers/helper';
import { FuncionarioService } from '@app/_services/Funcionario.service';
import { Funcionario } from '@app/_models/Funcionario';
import { ModalConsultaFuncionario } from '../modal/modalConsultaRegistroFuncionario.component';

@Component({ selector: 'app-funcionario', templateUrl: './funcionario.component.html' })
export class ConsultarFuncionarioComponent implements OnInit, AfterViewInit  {

  @ViewChildren('resultadosFuncionario') things: QueryList<any>;

  KEY_NOME = 'nome';

  funcionarios: Funcionario[];
  funcionario: Funcionario;

  funcionarioForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private funcionarioService: FuncionarioService,
              private authenticationService: AuthenticationService,
              private modalService: NgbModal) {
       Helper.validaSessaoUsuario(this.authenticationService, this.router);
   }

  ngOnInit(): void {
    this.consultaTodosFuncionarios();
    this.funcionarioForm = this.criaFormVazio();
  }

  onSubmit(funcionarioForm: NgForm) {
    this.submitted = true;
    funcionarioForm[this.KEY_NOME] ? this.consultaFuncionario(funcionarioForm[this.KEY_NOME]) : this.consultaTodosFuncionarios();
  }

  consultaTodosFuncionarios() {

    this.funcionarioService.getAllFuncionarios().toPromise()
        .then(data => {
          if (data){
            this.funcionarios = data;

            this.funcionarios.forEach(funcionario => {
              this.funcionario = funcionario;
              this.funcionario.jsonFuncionario = JSON.stringify(funcionario);
            });
          }
        });
  }

  consultaFuncionario(id) {
    this.funcionarioService.getFuncionario(id).toPromise()
        .then(data => {
          if (data){
            this.funcionarios = data;

            this.funcionarios.forEach(funcionario => {
              this.funcionario = funcionario;
              this.funcionario.jsonFuncionario = JSON.stringify(funcionario);
            });
          }else{
            document.getElementById('resultado').classList.add('d-none');
            alert('Antibiótico não encontrado');
          }
        });
  }

  ngAfterViewInit() {
    this.things.changes.subscribe(t => {
      this.ngForRendred();
    });
  }

  ngForRendred(){
    this.removeDisplayNoneNaTabelaResultados();
    this.aplicaEventoDeClickConsultarRegistro();
  }

  aplicaEventoDeClickConsultarRegistro(){
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

  criaFormVazio(){
    return this.formBuilder.group({
        nome: ['', Validators.required],
    });
  }
}
