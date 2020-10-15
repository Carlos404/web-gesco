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
import { LoginComponent } from './login';;
import { RegisterComponent } from './register/register.component'
;
import { CadastrarPacienteComponent } from './paciente/cadastrar/paciente.component'
import { ConsultarPacienteComponent } from './paciente/consultar/paciente.component'
import { Helper } from './_helpers/helper';;
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ModalConsultaPaciente } from './paciente/modal/modalConsultaRegistroPaciente.component';
import { Paciente } from './_models';

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
        LoginComponent
,
        RegisterComponent ,
        CadastrarPacienteComponent,
        ConsultarPacienteComponent,
        ModalConsultaPaciente   ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        Helper,
        ModalConsultaPaciente,
        NgbActiveModal,
        Paciente,
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }