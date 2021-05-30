import { Router } from '@angular/router';
import { Helper } from '@app/_helpers/helper';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthenticationService } from '@app/_services';
import { Antibiotico } from '@app/_models/antibiotico';
import { AntibioticoService } from '@app/_services/antibiotico.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({ selector: 'app-antibiotico', templateUrl: 'antibiotico.component.html' })
export class CadastrarAntibioticoComponent implements OnInit {

    antibioticoForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private title: Title,
        private router: Router,
        private formBuilder: FormBuilder,
        private ngxLoader: NgxUiLoaderService,
        private antibioticoService: AntibioticoService,
        private authenticationService: AuthenticationService) {
        Helper.validaSessaoUsuario(this.authenticationService, this.router);
    }

    ngOnInit() {
        this.ngxLoader.start();
        if (this.isEdicao() === undefined) {
            this.title.setTitle('Cadastro Antibiótico | GESCO ')
        }
        else {
            this.title.setTitle('Editar Antibiótico | GESCO')
        }

        this.antibioticoForm = this.isEdicao() ? this.criaFormEdicao(history.state.antibiotico) : this.criaFormVazio();
        this.ngxLoader.stop();
    }

    onSubmit(antibiotico: NgForm) {
        this.ngxLoader.start();
        this.submitted = true;
        if (this.isFormInvalido()) { return; }

        this.isEdicao() ? this.updateAntibiotico(antibiotico) : this.addAntibiotico(antibiotico);
        this.ngxLoader.stop();
    }
    updateAntibiotico(antibioticoForm: NgForm) {
        this.antibioticoService.updateAntibiotico(history.state.antibiotico.id, antibioticoForm)
            .subscribe(res => {
                this.router.navigate(['antibiotico/consultar']);
            }, (err) => {
                console.log(err);
            });
    }

    addAntibiotico(antibioticoForm: NgForm) {
        this.antibioticoService.insertAntibiotico(antibioticoForm)
            .subscribe(res => {
                this.router.navigate(['antibiotico/consultar']);
            }, (err) => {
                console.log(err);
            });
    }

    criaFormEdicao(antibiotico: Antibiotico) {
        return this.formBuilder.group({
            lote: [antibiotico.lote, Validators.required],
            nome: [antibiotico.nome, Validators.required],
            nomeComercial: [antibiotico.nome, Validators.required],
            dataValidade: [antibiotico.dataValidade, Validators.required],
            tipoAplicacao: [antibiotico.tipoAplicacao, Validators.required],
            funcionario: { id: antibiotico.idFuncionario }
        }
        );
    }

    criaFormVazio() {
        return this.formBuilder.group({
            lote: ['', Validators.required],
            nome: ['', Validators.required],
            nomeComercial: ['', Validators.required],
            dataValidade: ['', Validators.required],
            tipoAplicacao: ['', Validators.required],
            funcionario: { id: this.authenticationService.currentUserValue.funcionario.id }
        });
    }

    isEdicao() {
        return history.state.antibiotico;
    }

    isFormInvalido() {
        return this.antibioticoForm.invalid;
    }

    get f() { return this.antibioticoForm.controls; }

}
