import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticationService, PacienteService } from '@app/_services';
import { Helper } from '@app/_helpers/helper';
import { Paciente } from '@app/_models';
import { ModalConsultaPaciente } from '../modal/modalConsultaRegistroPaciente.component';

@Component({ selector: 'app-paciente', templateUrl: './paciente.component.html' })
export class ConsultarPacienteComponent implements OnInit {

  order: string = 'registry';
  reverse: boolean = false;

  @ViewChildren('resultadosPaciente') things: QueryList<any>;

  paciente: Paciente = { id: null, nome: '', sexo: '', dtNascimento: null, registry: null, jsonPaciente: '' };
  pacientes: Paciente[];

  pacienteForm: FormGroup;
  submitted = false;
  jsonPaciente;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private pacienteService: PacienteService,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal) {
    Helper.validaSessaoUsuario(this.authenticationService, this.router);
  }

  ngOnInit(): void {
    this.consultaTodosPacientes()
    this.pacienteForm = this.criaFormVazio()
  }

  onSubmit(pacienteForm: NgForm) {
    this.submitted = true;
    pacienteForm['nome'] ? this.consultaPaciente(pacienteForm['nome']) : this.consultaTodosPacientes();
  }

  consultaTodosPacientes() {
    this.pacienteService.getAllPacientes().toPromise()
      .then(data => {

        this.pacientes = data;

        this.pacientes.forEach(paciente => {
          this.paciente = paciente;
          this.paciente.jsonPaciente = JSON.stringify(paciente);
        });
      })
  }

  consultaPaciente(id) {
    this.pacienteService.getPaciente(id).toPromise()
      .then(data => {
        if (data) {
          this.pacientes = data;

          this.pacientes.forEach(paciente => {
            this.paciente = paciente;
            this.paciente.jsonPaciente = JSON.stringify(paciente);
          });
        } else {
          document.getElementById("resultado").classList.add("d-none")
          alert("Paciente não encontrado");
        }
      });
  }

  setOrder(order) {
    if (this.order === order) {
      this.reverse = !this.reverse;
    }

    this.order = order;
  }

  aplicaEventoDeClickConsultarRegistro() {
    document.querySelectorAll(".resultado")
      .forEach(resultado =>
        resultado.addEventListener("click", () => this.open(resultado.getAttribute("data-json-paciente")))
      );
  }

  ngAfterViewInit() {
    this.things.changes.subscribe(t => {
      this.ngForRendred();
    })
  }

  ngForRendred() {
    this.removeDisplayNoneNaTabelaResultados();
    this.aplicaEventoDeClickConsultarRegistro();
  }

  open(jsonPaciente) {
    this.modalService.open(ModalConsultaPaciente, { size: 'lg', }).componentInstance.jsonPaciente = jsonPaciente;
  }

  criaFormVazio() {
    return this.formBuilder.group({
      nome: ['', Validators.required],
    });
  }

  isFormInvalido() {
    return this.pacienteForm.invalid;
  }

  removeDisplayNoneNaTabelaResultados() {
    if (document.getElementById("resultado").classList.contains("d-none"))
      document.getElementById("resultado").classList.remove("d-none");
  }
}
