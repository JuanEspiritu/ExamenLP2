import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private ApiUrl = "http://localhost:8080/api/alumno";
  constructor(private http: HttpClient) { }

  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.ApiUrl);
  }
  getAlumnoByID(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.ApiUrl}/${id}`);
  }
  updateAlumno(id: number, alumno: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.ApiUrl}/${id}`, alumno);
  }
  deleteAlumno(id: number): Observable<Alumno> {
    return this.http.delete<Alumno>(`${this.ApiUrl}/${id}`);
  }
  crearAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.ApiUrl, alumno);
  }
}

