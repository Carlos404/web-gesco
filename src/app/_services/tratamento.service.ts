import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tratamento } from '@app/_models/Tratamento';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'https://gesco-api.herokuapp.com/api/tratamento';

@Injectable({
  providedIn: 'root'
})
export class TratamentoService {

  constructor(private http: HttpClient) { }

  getAllTratamentos(): Observable<Tratamento[]> {
    return this.http.get<Tratamento[]>(apiUrl).pipe(
      catchError(this.handleError<Tratamento[]>(`getAllTratamentos`))
    );
  }

  getTratamento(id: string): Observable<Tratamento[]> {
    const url = `${apiUrl}/?paciente=${id}`;
    return this.http.get<Tratamento[]>(url).pipe(
      catchError(this.handleError<Tratamento[]>(`getTratamento id=${id}`))
    );
  }

  insertTratamento(tratamento: any): Observable<Tratamento> {
    return this.http.post<Tratamento>(apiUrl, tratamento, httpOptions).pipe(
      catchError(this.handleError<Tratamento>('insertTratamento'))
    );
  }

  updateTratamento(id, tratamento): Observable<Tratamento> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, tratamento, httpOptions).pipe(
      catchError(this.handleError<any>('updateTratamento'))
    );
  }

  atualizaStatusTratamento(id: any, status: any): Observable<Tratamento> {
    const url = `${apiUrl}/atualizar/${id}/${status}`;
    return this.http.put(url, httpOptions).pipe(
      catchError(this.handleError<any>('updateTratamento'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }

}
