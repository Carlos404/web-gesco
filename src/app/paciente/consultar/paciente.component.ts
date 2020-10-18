import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticationService, PacienteService } from '@app/_services';
import { Helper } from '@app/_helpers/helper';
import { Paciente } from '@app/_models';
import { ModalConsultaPaciente } from '../modal/modalConsultaRegistroPaciente.component';

@Component({ selector: 'app-paciente',templateUrl: './paciente.component.html' })
export class ConsultarPacienteComponent implements OnInit {
  
  paciente: Paciente;
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
    this.pacienteForm = this.criaFormVazio()
  }

  onSubmit(pacienteForm: NgForm) {
    this.submitted = true;
    if (this.isFormInvalido()) return;
    this.consultaPaciente(pacienteForm['nome']);
  }

  consultaPaciente(id) {
    this.pacienteService
        .getPaciente(id)
        .toPromise()
        .then(data =>{
          if(data){
            this.paciente = data;
            this.jsonPaciente = JSON.stringify(data);

            if(document.getElementById("resultado").classList.contains("d-none")) document.getElementById("resultado").classList.remove("d-none");

            this.aplicaEventoDeClickConsultarRegistro();
          }else{
            document.getElementById("resultado").classList.add("d-none")
            alert("Paciente não encontrado");
          }
        });
  }

  aplicaEventoDeClickConsultarRegistro(){
    document.querySelectorAll(".resultado")
            .forEach(resultado =>
                     resultado.addEventListener("click", () => this.open(this.jsonPaciente))
    );
  }
  
  open(jsonPaciente) {
    this.modalService.open(ModalConsultaPaciente, { size: 'lg', }).componentInstance.paciente = JSON.parse(jsonPaciente);
  }

  criaFormVazio(){
    return this.formBuilder.group({
        nome: ['', Validators.required],
    });
  }

  isFormInvalido(){
    return this.pacienteForm.invalid;
  }
}
