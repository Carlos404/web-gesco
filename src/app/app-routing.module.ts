import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { CadastrarPacienteComponent } from './paciente/cadastrar/paciente.component';
import { ConsultarPacienteComponent } from './paciente/consultar/paciente.component';
import { ConsultarAntibioticoComponent } from './antibiotico/consultar/antibiotico.component';
import { CadastrarAntibioticoComponent } from './antibiotico/cadastrar/antibiotico.component';
import { RegisterComponent } from './register';
import { AuthGuard } from './_helpers';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'paciente/cadastrar', component: CadastrarPacienteComponent },
    { path: 'paciente/consultar', component: ConsultarPacienteComponent },
    { path: 'antibiotico/consultar', component: ConsultarAntibioticoComponent },
    { path: 'antibiotico/cadastrar', component: CadastrarAntibioticoComponent },

    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
