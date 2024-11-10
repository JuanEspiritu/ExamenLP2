import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private ApiUrl = "http://localhost:8080/api/curso";

  constructor(private http: HttpClient) { }

  getCursos(): Observable<Curso[]>{
    return this.http.get<Curso[]>(this.ApiUrl);
  }
  getCursoByID(id:number): Observable<Curso>{
    return this.http.get<Curso>(`${this.ApiUrl}/${id}`);
  }
  updateCurso(id: number, curso: Curso) : Observable<Curso>{
    return this.http.put<Curso>(`${this.ApiUrl}/${id}`, curso);
  }
  deleteCurso(id:number): Observable<Curso>{
    return this.http.delete<Curso>(`${this.ApiUrl}/${id}`);
  }
  crearCurso(curso : Curso): Observable<Curso>{
    return this.http.post<Curso>(this.ApiUrl, curso);
  }
}