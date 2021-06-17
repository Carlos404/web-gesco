import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prescricao } from '@app/_models/prescricao';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = 'https://gesco-api.herokuapp.com/api/prescricao';

@Injectable({
  providedIn: 'root'
})
export class PrescricaoService {

  constructor(private http: HttpClient) { }

  getAllPrescricoes(): Observable<Prescricao[]> {
    return this.http.get<Prescricao[]>(apiUrl).pipe(
      catchError(this.handleError<Prescricao[]>(`getAllPrescricoes`))
    );
  }

  insertPrescricao(prescricao: any): Observable<Prescricao> {
    return this.http.post<Prescricao>(apiUrl, prescricao, httpOptions).pipe(
      catchError(this.handleError<Prescricao>('insertPrescricao'))
    );
  }

  deletePrescricao(id): Observable<Prescricao> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Prescricao>(url, httpOptions).pipe(
      catchError(this.handleError<Prescricao>('deletePrescricao'))
    );
  }

  updatePrescricao(id, status, msg?): Observable<Prescricao> {
    const payload = {
      "descStatusTratamento": msg ? msg : "string",
      "statusTratamento": status
    }
    const url = `${apiUrl}/${id}`;
    return this.http.patch(url, payload, httpOptions).pipe(
      catchError(this.handleError<any>('updatePrescricao'))
    );
  }

  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
