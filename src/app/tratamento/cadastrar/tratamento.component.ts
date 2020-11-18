import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConsultarPacienteComponent } from '@app/paciente/consultar/paciente.component';
import { Helper } from '@app/_helpers/helper';
import { Tratamento } from '@app/_models/Tratamento';
import { AuthenticationService } from '@app/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Antibiotico } from './../../_models/antibiotico';
import { AntibioticoService } from './../../_services/antibiotico.service';
import { TratamentoService } from './../../_services/tratamento.service';

@Component({ selector: 'app-cadastro-tratamento', templateUrl: 'tratamento.component.html'})
export class CadastrarTratamentoComponent implements OnInit {

    tratamentoForm: FormGroup;
    loading = false;
    submitted = false;
    listaAntibioticos: Antibiotico[] = [];
    antibioticosSelecionados: Antibiotico[] = [];
    contador = 1;
    edicaoTratamento = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private antibioticoService: AntibioticoService,
        private tratamento: TratamentoService,
        private modalService: NgbModal
    ) {
        Helper.validaSessaoUsuario(this.authenticationService, this.router);
    }

    ngOnInit() {
      if (this.isEdicao()){
        this.edicaoTratamento = true;
        this.tratamentoForm = this.criaFormEdicao(history.state.tratamento);
        this.adicionaValoresFormAntibiotico(history.state.tratamento.antibioticosId);
      }else{
        this.edicaoTratamento = false;
        this.tratamentoForm = this.criaFormVazio();
      }
      this.antibioticos.removeAt(0);
      this.consultaTodosAntibioticos();
    }
    get f() { return this.tratamentoForm.controls; }

    onSubmit(tratamentoForm: NgForm) {
        this.antibioticos.removeAt(0);

        this.submitted = true;
        if (this.tratamentoForm.invalid) {
          return;
        }

        let formInvalido = this.isFormValido(tratamentoForm);

        if(formInvalido){
          alert(formInvalido);
          return;
        }

        this.isEdicao() ? this.updateTratamento(tratamentoForm) : this.addTratamento(tratamentoForm);
    }

    updateTratamento(tratamentoForm: NgForm) {

      this.tratamento.updateTratamento(history.state.tratamento.id, tratamentoForm)
          .subscribe(res => {
              this.router.navigate(['tratamento/consultar']);
          }, (err) => {
              console.log(err);
          });
    }
    addTratamento(tratamentoForm: NgForm) {
      this.tratamento.insertTratamento(tratamentoForm)
          .subscribe(res => {
              this.router.navigate(['tratamento/consultar']);
          }, (err) => {
              console.log(err);
          });
    }

    consultaTodosAntibioticos() {

      this.antibioticoService.getAllAntibioticos().toPromise().then(data => { if (data) { this.listaAntibioticos = data; } });
    }

    openPaciente() {
      const instanciaModal = this.modalService.open(ConsultarPacienteComponent,{ size: 'xl', });
      instanciaModal.componentInstance.origemTratamento = true;

      instanciaModal.result.then((jsonPaciente) => {
        const paciente = JSON.parse(jsonPaciente);
        this.tratamentoForm.get('nomePaciente').setValue(paciente.nome);
        this.tratamentoForm.get('paciente').setValue({id: paciente.id});
        });
    }

    criaFormEdicao(tratamento: Tratamento){
      return this.formBuilder.group({
          diagnostico: [tratamento.diagnostico, Validators.required],
          inicio_tratamento: [tratamento.inicio_tratamento, Validators.required],
          fim_tratamento: [tratamento.fim_tratamento, Validators.required],
          doseDiario: [tratamento.doseDiario, Validators.required],
          statusTratamento: [0, Validators.required],
          obs: [tratamento.obs, Validators.required],
          nomePaciente: [tratamento.paciente, Validators.required],
          paciente: {id: tratamento.pacienteId},
          antibioticos: this.formBuilder.array([this.criaFormAntibiotico()]),
          funcionario: {idFuncionario: this.authenticationService.currentUserValue.id},
          multiplosAntibioticos : ['', Validators.required]
      });
    }

    criaFormVazio(){
      return this.formBuilder.group({
        diagnostico: ['', Validators.required],
        inicio_tratamento: ['', Validators.required],
        fim_tratamento: ['', Validators.required],
        doseDiario: ['', Validators.required],
        statusTratamento: [0, Validators.required],
        obs: ['', Validators.required],
        nomePaciente: ['', Validators.required],
        paciente: {id: ''},
        antibioticos: this.formBuilder.array([this.criaFormAntibiotico()]),
        funcionario: {idFuncionario: this.authenticationService.currentUserValue.id},
        multiplosAntibioticos : ['', Validators.required]
      });
  }

  adicionaValoresFormAntibiotico(tratamentoAntibioticos){
    this.antibioticos.removeAt(0);
    tratamentoAntibioticos.forEach(antibiotico => {
      this.antibioticos.push(this.criaFormAntibioticoComValor(antibiotico));
    });

    this.antibioticosSelecionados = tratamentoAntibioticos;
  }

  criaFormAntibiotico(){
    return this.formBuilder.group({
      id: ['']
    });
  }
  adicionaAntibiotico(){
    const antibioticosSelecionados = this.antibioticosSelecionados;

    this.antibioticos.clear();

    antibioticosSelecionados.forEach(antibiotico =>{
      this.antibioticos.push(this.criaFormAntibioticoComValor(antibiotico));
    });

  }

  limpaAntibioticos(){
    this.antibioticos.clear();
  }

  criaFormAntibioticoComValor(antibiotico){
    return this.formBuilder.group({
      id: [antibiotico]
    });
  }

  isEdicao(){
      return history.state.tratamento;
  }

  get antibioticos(): FormArray {
    return this.tratamentoForm.get('antibioticos') as FormArray;
  }

  get a() { return this.antibioticos.controls; }

  verificaDatas(tratamentoForm){
    const inicioTratamento = 'inicio_tratamento';
    const fimTratamento = 'fim_tratamento';

    if (new Date(tratamentoForm[inicioTratamento]) > new Date(tratamentoForm[fimTratamento]) ){
      return false;
    }

    return true;
  }

  dosagemCorreta(tratamentoForm){
    const dose = 'doseDiario';
    if (tratamentoForm[dose] <= 0){
      return false;
    }
    return true;
  }

  isFormValido(tratamentoForm){
    let erros;

    if (!this.verificaDatas(tratamentoForm)){
      erros = 'Fim do tratamento tem que ser maior do que o ínicio';
    }
    if (!this.dosagemCorreta(tratamentoForm)){
      erros += '\n Dosagem tem que ser no mínimo 1';
    }

    if (erros){
      return erros;
    }

    return false;

  }


}
