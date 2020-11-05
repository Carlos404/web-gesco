import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsultarAntibioticoComponent } from '@app/antibiotico/consultar/antibiotico.component';
import { ConsultarPacienteComponent } from '@app/paciente/consultar/paciente.component';
import { Helper } from '@app/_helpers/helper';
import { Antibiotico } from '@app/_models/antibiotico';
import { Tratamento } from '@app/_models/tratamento';
import { AuthenticationService } from '@app/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AntibioticoService } from './../../_services/antibiotico.service';



@Component({ selector: 'app-cadastro-tratamento', templateUrl: 'tratamento.component.html'})
export class CadastrarTratamentoComponent implements OnInit {

    tratamentoForm: FormGroup;
    loading = false;
    submitted = false;
    listaAntibioticos: Antibiotico[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private antibioticoService: AntibioticoService,
        private modalService: NgbModal
    ) {
        Helper.validaSessaoUsuario(this.authenticationService, this.router);
    }

    ngOnInit() {
      this.tratamentoForm = this.isEdicao() ? this.criaFormEdicao(history.state.funcionario) : this.criaFormVazio();
      this.consultaTodosAntibioticos();
    }
    get f() { return this.tratamentoForm.controls; }

    onSubmit(antibioticoForm: NgForm) {
        this.submitted = true;
        if (this.tratamentoForm.invalid) {
            return;
        }
    }

    consultaTodosAntibioticos() {

      this.antibioticoService.getAllAntibioticos().toPromise().then(data => { if (data) { this.listaAntibioticos = data; } });
    }

    openPaciente() {
      const instanciaModal = this.modalService.open(ConsultarPacienteComponent,{ size: 'xl', });
      instanciaModal.componentInstance.origemTratamento = true;

      instanciaModal.result.then((jsonPaciente) => {
        const paciente = JSON.parse(jsonPaciente);
        this.tratamentoForm.get('paciente').setValue(paciente.nome)
        });
    }

    criaFormEdicao(tratamento: Tratamento){
      return this.formBuilder.group({
          diagnostico: [tratamento.diagnostico, Validators.required],
          inicio_tratamento: [tratamento.inicio_tratamento, Validators.required],
          fim_tratamento: [tratamento.fim_tratamento, Validators.required],
          doseDiario: [tratamento.doseDiario, Validators.required],
          statusTratamento: [tratamento.statusTratamento, Validators.required],
          obs: [tratamento.obs, Validators.required],
          nomePaciente: [tratamento.paciente, Validators.required],
          paciente: [tratamento.paciente, Validators.required],
          antibioticos: [tratamento.antibioticos, Validators.required],
          funcionario: {idFuncionario: tratamento.funcionario}
      });
    }

    criaFormVazio(){
      return this.formBuilder.group({
        diagnostico: ['', Validators.required],
        inicio_tratamento: ['', Validators.required],
        fim_tratamento: ['', Validators.required],
        doseDiario: ['', Validators.required],
        statusTratamento: ['', Validators.required],
        obs: ['', Validators.required],
        nomePaciente: ['', Validators.required],
        paciente: ['', Validators.required],
        antibioticos: ['', Validators.required],
        funcionario: {idFuncionario: this.authenticationService.currentUserValue.id}
      });
  }
    isEdicao(){
      return history.state.funcionario;
  }
}
