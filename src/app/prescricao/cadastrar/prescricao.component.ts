import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { PrescricaoService } from '@app/_services/prescricao.service';
import { AntibioticoService } from '@app/_services/antibiotico.service';

@Component({
  selector: 'app-prescricao',
  templateUrl: './prescricao.component.html',
  styleUrls: ['./prescricao.component.css']
})
export class CadastrarPrescricaoComponent implements OnInit {

  prescTratamento;
  prescricaoForm;
  submitted;
  listaAntibioticos;

  constructor(
    private prescricao: PrescricaoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private ngxLoader: NgxUiLoaderService,
    private title: Title,
    private antibioticoService: AntibioticoService
  ) {

  }

  ngOnInit() {

    this.ngxLoader.start();

    this.title.setTitle('Cadastro Prescrição | GESCO ')
    this.prescTratamento = history.state.prescricaoId;

    this.prescricaoForm = this.criaFormVazio(this.prescTratamento);
    this.consultaTodosAntibioticos();
    this.ngxLoader.stop();
  }

  onSubmit(prescricaoForm: NgForm) {
    this.ngxLoader.start();
    this.submitted = true;

    if (this.prescricaoForm.invalid) {
      return;
    }

    this.addPrescricao(prescricaoForm);

  }

  consultaTodosAntibioticos() {
    this.antibioticoService.getAllAntibioticos().toPromise().then(data => { if (data) { this.listaAntibioticos = data; } });
  }

  addPrescricao(prescricaoForm: NgForm) {
    this.prescricao.insertPrescricao(prescricaoForm)
      .subscribe(res => {
        this.router.navigate(['paciente/consultar']);
      })
  }

  criaFormVazio(prescricaoForm) {
    return this.formBuilder.group({
      idTratamento: [prescricaoForm, Validators.required],
      descPrescricao: ['', Validators.required],
      diasTratamento: ['', Validators.required],
      dosagemDiaria: ['', Validators.required],
      idAntibiotico: ['', Validators.required],
      periodiociadade: ['', Validators.required]
    })
  };
}

