import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConsultarPacienteComponent } from '@app/paciente/consultar/paciente.component';
import { Helper } from '@app/_helpers/helper';
import { AuthenticationService } from '@app/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Antibiotico } from './../../_models/antibiotico';
import { AntibioticoService } from './../../_services/antibiotico.service';
import { TratamentoService } from './../../_services/tratamento.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PrescricaoService } from '@app/_services/prescricao.service';

@Component({ selector: 'app-cadastro-tratamento', templateUrl: 'tratamento.component.html' })
export class CadastrarTratamentoComponent implements OnInit {

  @ViewChildren('resultadosPrescricoes') things: QueryList<any>;

  tratamentoForm;
  loading = false;
  submitted = false;
  listaAntibioticos: Antibiotico[] = [];
  antibioticosSelecionados: Antibiotico[] = [];
  contador = 1;
  edicaoTratamento = false;
  trataPaciente;
  allTrata;
  openView = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private title: Title,
    private prescricao: PrescricaoService,
    private ngxLoader: NgxUiLoaderService,
    private authenticationService: AuthenticationService,
    private antibioticoService: AntibioticoService,
    private tratamento: TratamentoService,
    private modalService: NgbModal
  ) {
    Helper.validaSessaoUsuario(this.authenticationService, this.router);
  }

    async ngOnInit() {
    this.ngxLoader.start();
    if (await this.isEdicao() === false) {
      this.title.setTitle('Cadastro Tratamento | GESCO ')
    }
    else {
      this.title.setTitle('Editar Tratamento | GESCO')
    }

    if (await this.isEdicao() !== false) {
      this.edicaoTratamento = true;
      this.tratamento.getTratamento(this.trataPaciente.registro).toPromise()
        .then( data => {
          if (data) {
            this.tratamentoForm = this.criaFormEdicao(data);
          } else {
            document.getElementById('resultado').classList.add('d-none');
            alert('Tratamento não encontrado');
          }
        });
      // this.adicionaValoresFormAntibiotico(this.trataPaciente.antibioticosId);

    } else {
      this.edicaoTratamento = false;
      this.tratamentoForm = this.criaFormVazio(this.trataPaciente);
      this.openView = true;
    }
    // this.antibioticos.removeAt(0);
    this.ngxLoader.stop();
  }
  get f() { return this.tratamentoForm.controls; }

  async onSubmit(tratamentoForm: NgForm) {
    this.ngxLoader.start();
    // this.antibioticos.removeAt(0);

    this.submitted = true;
    if (this.tratamentoForm.invalid) {
      return;
    }

    let formInvalido = this.isFormValido(tratamentoForm);

    if (formInvalido) {
      alert(formInvalido);
      return;
    }

    await this.isEdicao() ? this.updateTratamento(tratamentoForm) : this.addTratamento(tratamentoForm);
    this.ngxLoader.stop();
  }

  updateTratamento(tratamentoForm: NgForm) {

    this.tratamento.updateTratamento(this.trataPaciente.idTratamento, tratamentoForm)
      .subscribe(res => {
        this.router.navigate(['paciente/consultar']);
      }, (err) => {
        console.log(err);
      });
  }
  addTratamento(tratamentoForm: NgForm) {
    this.tratamento.insertTratamento(tratamentoForm)
      .subscribe(res => {
        this.router.navigate(['paciente/consultar']);
      }, (err) => {
        console.log(err);
      });
  }

  deletePrescricao(id) {
    this.prescricao.deletePrescricao(id)
    .subscribe();
  }

  openPaciente() {
    const instanciaModal = this.modalService.open(ConsultarPacienteComponent, { size: 'xl', });
    instanciaModal.componentInstance.origemTratamento = true;

    instanciaModal.result.then((jsonPaciente) => {
      const paciente = JSON.parse(jsonPaciente);
      this.tratamentoForm.get('nome').setValue(paciente.nome);
      this.tratamentoForm.get('paciente').setValue({ id: paciente.id });
    });
  }

  criaFormEdicao(tratamento) {
    tratamento.forEach(element => {
      let teste;
      Array(element.prescricoes).forEach(res =>teste = res)
      this.allTrata = this.formBuilder.group({
        id: [element.id],
        diagnostico: [element.descDiagnostico, Validators.required],
        paciente: [element.nomePaciente, Validators.required],
        pacienteId: [element.registroPaciente, Validators.required],
        prescricoes:[teste , Validators.required],
        idTratamento: [element.idTratamento],
        funcionario: { idFuncionario: element.loginFucnionario }
      }
      );
    });
    return this.allTrata
  }

  criaFormVazio(paciente) {
    this.edicaoTratamento = false;
    return this.formBuilder.group({
      descDiagnostico: ['', Validators.required],
      registroPaciente: [paciente.registro, Validators.required],
      hospital: this.authenticationService.currentUserValue.funcionario.hospial.nome,
      loginFucnionario: this.authenticationService.currentUserValue.funcionario.login
    });
  }

  adicionaValoresFormAntibiotico(tratamentoAntibioticos) {
    // this.antibioticos.removeAt(0);
    tratamentoAntibioticos.forEach(antibiotico => {
      // this.antibioticos.push(this.criaFormAntibioticoComValor(antibiotico));
    });

    this.antibioticosSelecionados = tratamentoAntibioticos;
  }

  criaFormAntibiotico() {
    return this.formBuilder.group({
      id: ['']
    });
  }
  adicionaAntibiotico() {
    const antibioticosSelecionados = this.antibioticosSelecionados;

    // this.antibioticos.clear();

    antibioticosSelecionados.forEach(antibiotico => {
      // this.antibioticos.push(this.criaFormAntibioticoComValor(antibiotico));
    });

  }

  limpaAntibioticos() {
    // this.antibioticos.clear();
  }

  criaFormAntibioticoComValor(antibiotico) {
    return this.formBuilder.group({
      id: [antibiotico]
    });
  }

  async isEdicao() {
    this.trataPaciente = history.state.paciente ? history.state.paciente : history.state.tratamento;
    let isEdit
    await this.tratamento.getTratamento(this.trataPaciente.registro).toPromise()
      .then(data => {
        if (data) {
          isEdit = true
        } else {
          isEdit = false
        }
      });

    return await isEdit ? this.trataPaciente : false;

    // return this.trataPaciente = history.state.paciente ? history.state.paciente : history.state.tratamento;

  }

  // get antibioticos(): FormArray {
  //   return this.tratamentoForm.get('antibioticos') as FormArray;
  // }

  // get a() { return this.antibioticos.controls; }

  verificaDatas(tratamentoForm) {
    const inicioTratamento = 'inicio_tratamento';
    const fimTratamento = 'fim_tratamento';

    if (new Date(tratamentoForm[inicioTratamento]) > new Date(tratamentoForm[fimTratamento])) {
      return false;
    }

    return true;
  }

  dosagemCorreta(tratamentoForm) {
    const dose = 'doseDiario';
    if (tratamentoForm[dose] <= 0) {
      return false;
    }
    return true;
  }

  isFormValido(tratamentoForm) {
    let erros;

    if (!this.verificaDatas(tratamentoForm)) {
      erros = 'Fim do tratamento tem que ser maior do que o ínicio';
    }
    if (!this.dosagemCorreta(tratamentoForm)) {
      erros += '\n Dosagem tem que ser no mínimo 1';
    }

    if (erros) {
      return erros;
    }

    return false;

  }

  redirecionaPrescricao(){
    if(this.tratamentoForm.value.idTratamento.length !== 0){
      this.router.navigate(['/prescricao/cadastrar'], {state: {prescricaoId: this.tratamentoForm.value.idTratamento}})
    } else {
      this.router.navigate(['/prescricao/cadastrar'], {state: {prescricaoId: 1}})
    }
  }
}
