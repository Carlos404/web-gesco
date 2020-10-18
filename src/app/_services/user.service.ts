import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { controlador } from '@environments/controlador';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getUser(senha: any, usuario: any) {
        return this.http.get<User[]>(`${controlador.apiUrl}login?pass=${senha}&user=${usuario}`);
    }

}