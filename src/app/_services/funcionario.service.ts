import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Funcionario } from '@app/_models/funcionario';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'https://gesco-api.herokuapp.com/funcionarios';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(private http: HttpClient) { }

  getAllFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(apiUrl).pipe(
      catchError(this.handleError<Funcionario[]>(`getAllFuncionarios`))
    );
  }

  getFuncionario(id: string): Observable<Funcionario[]> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Funcionario[]>(url).pipe(
      catchError(this.handleError<Funcionario[]>(`getFuncionario id=${id}`))
    );
  }

  insertFuncionario(funcionario: any): Observable<Funcionario> {
    return this.http.post<Funcionario>(apiUrl, funcionario, httpOptions).pipe(
      catchError(this.handleError<Funcionario>('insertFuncionario'))
    );
  }

  updateFuncionario(id, funcionario): Observable<Funcionario> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, funcionario, httpOptions).pipe(
      catchError(this.handleError<any>('updateFuncionario'))
    );
  }

  deleteFuncionario(id): Observable<Funcionario> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Funcionario>(url, httpOptions).pipe(
      catchError(this.handleError<Funcionario>('deleteFuncionario'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }

}
