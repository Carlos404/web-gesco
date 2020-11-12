import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';

import { CadastrarPacienteComponent } from './paciente/cadastrar/paciente.component';
import { ConsultarPacienteComponent } from './paciente/consultar/paciente.component';
import { Helper } from './_helpers/helper';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalConsultaPaciente } from './paciente/modal/modalConsultaRegistroPaciente.component';
import { Paciente } from './_models';
import { ConsultarAntibioticoComponent } from './antibiotico/consultar/antibiotico.component';
import { Antibiotico } from './_models/antibiotico';
import { ModalConsultaAntibiotico } from './antibiotico/modal/modalConsultaRegistroAntibiotico.component';
import { CadastrarAntibioticoComponent } from './antibiotico/cadastrar/antibiotico.component';
import { ModalAviso } from './modals/modal-aviso.component';
import { ModalConsultaFuncionario } from './funcionario/modal/modalConsultaRegistroFuncionario.component';
import { ConsultarFuncionarioComponent } from './funcionario/consultar/funcionario.component';
import { CadastrarFuncionarioComponent } from './funcionario/cadastrar/funcionario.component';
import { Funcionario } from './_models/funcionario';
import { GetCargoPipe, GetStatusTratamentoPipe } from './_helpers/util.pipes';
import { OrderModule } from 'ngx-order-pipe';
import { CadastrarTratamentoComponent } from './tratamento/cadastrar/tratamento.component';
import { ConsultarTratamentoComponent } from './tratamento/consultar/tratamento.component';
import { ModalConsultaTratamento } from './tratamento/modal/modalConsultaRegistroTratamento.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        OrderModule,
        NgSelectModule,
        FormsModule,
        NgbModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        CadastrarFuncionarioComponent,
        ConsultarFuncionarioComponent,
        CadastrarPacienteComponent,
        ConsultarPacienteComponent,
        CadastrarTratamentoComponent,
        ConsultarTratamentoComponent,
        ModalConsultaPaciente ,
        CadastrarAntibioticoComponent,
        ConsultarAntibioticoComponent,
        ModalConsultaAntibiotico,
        ModalConsultaFuncionario,
        ModalConsultaTratamento,
        GetCargoPipe,
        GetStatusTratamentoPipe,
        ModalAviso  ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        Helper,
        ModalConsultaPaciente,
        ModalConsultaAntibiotico,
        ModalConsultaFuncionario,
        ModalConsultaTratamento,
        CadastrarTratamentoComponent,
        NgbActiveModal,
        Funcionario,
        Paciente,
        Antibiotico,
        ModalAviso,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
