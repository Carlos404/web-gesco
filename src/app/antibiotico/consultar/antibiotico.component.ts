import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/_services';
import { Helper } from '@app/_helpers/helper';
import { AntibioticoService } from '@app/_services/antibiotico.service';
import { Antibiotico } from '@app/_models/antibiotico';
import { ModalConsultaAntibiotico } from '../modal/modalConsultaRegistroAntibiotico.component';

@Component({ selector: 'app-antibiotico',templateUrl: './antibiotico.component.html' })
export class ConsultarAntibioticoComponent implements OnInit {

  order: string = 'antibiotico.nome';
  reverse: boolean = false;

  @ViewChildren('resultadosAntibiotico') things: QueryList<any>;

  antibioticos: Antibiotico[];
  antibiotico: Antibiotico;

  antibioticoForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private antibioticoService: AntibioticoService,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal) {
       Helper.validaSessaoUsuario(this.authenticationService, this.router);
   }

  ngOnInit(): void {
    this.consultaTodosAntibioticos();
    this.antibioticoForm = this.criaFormVazio();
  }

  onSubmit(antibioticoForm: NgForm) {
    this.submitted = true;
    antibioticoForm['nome'] ? this.consultaAntibiotico(antibioticoForm['nome']) : this.consultaTodosAntibioticos();
  }

  consultaTodosAntibioticos() {
    this.antibioticoService.getAllAntibioticos().toPromise()
        .then(data =>{
          if(data){
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
        .then(data =>{
          if(data){
            this.antibioticos = data;

            this.antibioticos.forEach(antibiotico => {
              this.antibiotico = antibiotico;
              this.antibiotico.jsonAntibiotico = JSON.stringify(antibiotico);
            });
          }else{
            document.getElementById("resultado").classList.add("d-none")
            alert("Antibiótico não encontrado");
          }
        });
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  ngAfterViewInit() {
    this.things.changes.subscribe(t => {
      this.ngForRendred();
    })
  }

  ngForRendred(){
    this.removeDisplayNoneNaTabelaResultados();
    this.aplicaEventoDeClickConsultarRegistro();
  }

  aplicaEventoDeClickConsultarRegistro(){
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

  criaFormVazio(){
    return this.formBuilder.group({
        nome: ['', Validators.required],
    });
  }
}
