import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

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


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule
,
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
        ModalConsultaPaciente ,
        CadastrarAntibioticoComponent,
        ConsultarAntibioticoComponent,
        ModalConsultaAntibiotico,
        ModalConsultaFuncionario,
        ModalAviso  ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        Helper,
        ModalConsultaPaciente,
        ModalConsultaAntibiotico,
        ModalConsultaFuncionario,
        NgbActiveModal,
        Funcionario,
        Paciente,
        Antibiotico,
        ModalAviso,
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
