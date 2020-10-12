import { Injectable } from '@angular/core';
import { from, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Paciente } from '@app/_models';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'https://gesco-api.herokuapp.com/pacientes';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http: HttpClient) { }
  
  insertPaciente(paciente: any): Observable<Paciente> {
    
    return this.http.post<Paciente>(apiUrl, paciente, httpOptions).pipe(

      tap((paciente: Paciente) => console.log(`adicionou o paciente com o/ id=${paciente.id}`)),
      
      catchError(this.handleError<Paciente>('insertPaciente'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
  
}
