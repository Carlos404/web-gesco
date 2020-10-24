import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Antibiotico } from '@app/_models/antibiotico';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'https://gesco-api.herokuapp.com/antibioticos';

@Injectable({
  providedIn: 'root'
})
export class AntibioticoService {
O
  constructor(private http: HttpClient) { }
  
  getAllAntibioticos(): Observable<Antibiotico[]> {
    return this.http.get<Antibiotico[]>(apiUrl).pipe(
      catchError(this.handleError<Antibiotico[]>(`getAllAntibioticos`))
    );
  }

  getAntibiotico(id: string): Observable<Antibiotico[]> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Antibiotico[]>(url).pipe(
      catchError(this.handleError<Antibiotico[]>(`getAntibiotico id=${id}`))
    );
  }

  insertAntibiotico(antibiotico: any): Observable<Antibiotico> {
    return this.http.post<Antibiotico>(apiUrl, antibiotico, httpOptions).pipe(
      catchError(this.handleError<Antibiotico>('insertAntibiotico'))
    );
  }

  updateAntibiotico(id, antibiotico): Observable<Antibiotico> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, antibiotico, httpOptions).pipe(
      catchError(this.handleError<any>('updateAntibiotico'))
    );
  }

  deleteAntibiotico(id): Observable<Antibiotico> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Antibiotico>(url, httpOptions).pipe(
      catchError(this.handleError<Antibiotico>('deleteAntibiotico'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
  
}
