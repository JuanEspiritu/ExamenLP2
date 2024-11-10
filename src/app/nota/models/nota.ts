import { Alumno } from "../../alumno/models/alumno";
import { Curso } from "../../curso/models/curso";

export class Nota {
  id: number;
  alumno?: Alumno; // Clave foránea a la tabla ALUMNOS
  curso?: Curso;    // Clave foránea a la tabla CURSOS
  nota1: number;
  nota2: number;
  nota3: number;
  promedio: number;

  constructor(
    id: number = 0,
    alumno?: Alumno,
    curso?: Curso,
    nota1: number = 0,
    nota2: number = 0,
    nota3: number = 0,
    promedio: number = 0
  ) {
    this.id = id;
    this.alumno = alumno;
    this.curso = curso;
    this.nota1 = nota1;
    this.nota2 = nota2;
    this.nota3 = nota3;
    this.promedio = promedio;
  }
}
