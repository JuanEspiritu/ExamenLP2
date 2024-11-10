import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nota } from '../models/nota';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  private ApiUrl = "http://localhost:8080/api/nota";

  constructor(private http: HttpClient) { }

  getNotas(): Observable<Nota[]>{
    return this.http.get<Nota[]>(this.ApiUrl);
  }
  getNotaByID(id:number): Observable<Nota>{
    return this.http.get<Nota>(`${this.ApiUrl}/${id}`);
  }
  updateNota(id: number, nota: Nota) : Observable<Nota>{
    return this.http.put<Nota>(`${this.ApiUrl}/${id}`, nota);
  }
  deleteNota(id:number): Observable<Nota>{
    return this.http.delete<Nota>(`${this.ApiUrl}/${id}`);
  }
  crearNota(nota : Nota): Observable<Nota>{
    return this.http.post<Nota>(this.ApiUrl, nota);
  }
}