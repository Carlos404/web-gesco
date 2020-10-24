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
  
  getAllPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(apiUrl).pipe(
      catchError(this.handleError<Paciente[]>(`getAllPacientes`))
    );
  }

  getPaciente(id: string): Observable<Paciente[]> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Paciente[]>(url).pipe(
      catchError(this.handleError<Paciente[]>(`getPaciente id=${id}`))
    );
  }

  insertPaciente(paciente: any): Observable<Paciente> {
    return this.http.post<Paciente>(apiUrl, paciente, httpOptions).pipe(
      catchError(this.handleError<Paciente>('insertPaciente'))
    );
  }

  updatePaciente(id, paciente): Observable<Paciente> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, paciente, httpOptions).pipe(
      catchError(this.handleError<any>('updatePaciente'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
  
}
