import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { CadastrarPacienteComponent } from './paciente/cadastrar/paciente.component';
import { ConsultarPacienteComponent } from './paciente/consultar/paciente.component';
import { ConsultarAntibioticoComponent } from './antibiotico/consultar/antibiotico.component';
import { CadastrarAntibioticoComponent } from './antibiotico/cadastrar/antibiotico.component';
import { AuthGuard } from './_helpers';
import { ConsultarFuncionarioComponent } from './funcionario/consultar/funcionario.component';
import { CadastrarFuncionarioComponent } from './funcionario/cadastrar/funcionario.component';
import { ConsultarTratamentoComponent } from './tratamento/consultar/tratamento.component';
import { CadastrarTratamentoComponent } from './tratamento/cadastrar/tratamento.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'funcionario/cadastrar', component: CadastrarFuncionarioComponent },
    { path: 'funcionario/consultar', component: ConsultarFuncionarioComponent },
    { path: 'paciente/cadastrar', component: CadastrarPacienteComponent },
    { path: 'paciente/consultar', component: ConsultarPacienteComponent },
    { path: 'antibiotico/consultar', component: ConsultarAntibioticoComponent },
    { path: 'antibiotico/cadastrar', component: CadastrarAntibioticoComponent },
    { path: 'tratamento/consultar', component: ConsultarTratamentoComponent },
    { path: 'tratamento/cadastrar', component: CadastrarTratamentoComponent },

    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
