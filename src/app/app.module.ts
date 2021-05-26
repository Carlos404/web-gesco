import { Paciente } from './_models';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { NgModule } from '@angular/core';
import { Helper } from './_helpers/helper';
import { OrderModule } from 'ngx-order-pipe';
import { AppComponent } from './app.component';
import { NgxUiLoaderModule } from "ngx-ui-loader"
import { FilterPipeModule } from 'ngx-filter-pipe';
import { Funcionario } from './_models/funcionario';
import { Antibiotico } from './_models/antibiotico';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ModalAviso } from './modals/modal-aviso.component';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CadastrarPacienteComponent } from './paciente/cadastrar/paciente.component';
import { ConsultarPacienteComponent } from './paciente/consultar/paciente.component';
import { ConsultarTratamentoComponent } from './tratamento/consultar/tratamento.component';
import { CadastrarTratamentoComponent } from './tratamento/cadastrar/tratamento.component';
import { CadastrarAntibioticoComponent } from './antibiotico/cadastrar/antibiotico.component';
import { ConsultarAntibioticoComponent } from './antibiotico/consultar/antibiotico.component';
import { ConsultarFuncionarioComponent } from './funcionario/consultar/funcionario.component';
import { CadastrarFuncionarioComponent } from './funcionario/cadastrar/funcionario.component';
import { GetCargoPipe, GetStatusTratamentoPipe, GetNomeSexoPipe, GetNomeAplicacaoPipe } from './_helpers/util.pipes';
import { ModalConsultaPaciente } from './paciente/modal/modalConsultaRegistroPaciente.component';
import { ModalConsultaTratamento } from './tratamento/modal/modalConsultaRegistroTratamento.component';
import { ModalConsultaAntibiotico } from './antibiotico/modal/modalConsultaRegistroAntibiotico.component';
import { ModalConsultaFuncionario } from './funcionario/modal/modalConsultaRegistroFuncionario.component';

@NgModule({
    imports: [
        NgbModule,
        OrderModule,
        FormsModule,
        BrowserModule,
        NgSelectModule,
        FilterPipeModule,
        HttpClientModule,
        AppRoutingModule,
        NgxUiLoaderModule,
        ReactiveFormsModule
    ],
    declarations: [
        ModalAviso,
        GetCargoPipe,
        AppComponent,
        HomeComponent,
        LoginComponent,
        GetNomeSexoPipe,
        GetNomeAplicacaoPipe,
        ModalConsultaPaciente,
        GetStatusTratamentoPipe,
        ModalConsultaTratamento,
        ModalConsultaAntibiotico,
        ModalConsultaFuncionario,
        CadastrarPacienteComponent,
        ConsultarPacienteComponent,
        CadastrarTratamentoComponent,
        ConsultarTratamentoComponent,
        CadastrarFuncionarioComponent,
        ConsultarFuncionarioComponent,
        CadastrarAntibioticoComponent,
        ConsultarAntibioticoComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        Helper,
        Paciente,
        ModalAviso,
        Funcionario,
        Antibiotico,
        NgbActiveModal,
        ModalConsultaPaciente,
        ModalConsultaAntibiotico,
        ModalConsultaFuncionario,
        ModalConsultaTratamento,
        CadastrarTratamentoComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
