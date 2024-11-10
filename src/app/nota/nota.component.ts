import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {TableModule} from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog'; 
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { Alumno } from '../alumno/models/alumno';
import { Curso } from '../curso/models/curso';
import { Nota } from './models/nota';
import { CursoService } from '../curso/services/curso.service';
import { AlumnoService } from '../alumno/services/alumno.service';
import { NotaService } from './services/nota.service';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { SidebarModule } from 'primeng/sidebar';
@Component({
  selector: 'app-nota',
  standalone: true,
  imports: [TableModule, ButtonModule, DialogModule, RouterModule, InputTextModule,
    FormsModule, ConfirmDialogModule, ToastModule, DropdownModule, SidebarComponent, SidebarModule],
  templateUrl: './nota.component.html',
  styleUrl: './nota.component.css'
})
export class NotaComponent {
  alumnos:Alumno[]=[];
  cursos:Curso[]=[];
  notas:Nota[]=[];
  visible:boolean=false;
  isDeleteInProgress:boolean=false;
  nota=new Nota();
  titulo:string='';
  opc:string='';
  op = 0; 
  selectedMarca: Curso | undefined;
  selectedTipo: Alumno | undefined;
  constructor(
    private cursoService: CursoService,
    private alumnoService: AlumnoService,
    private notaService: NotaService,
    private messageService: MessageService
  ){}
  ngOnInit(){
    this.listarNotas();
    this.listarAlumnos();
    this.listasCursos();
  }
  listarAlumnos(){
    this.alumnoService.getAlumnos().subscribe((data)=>{
      this.alumnos=data;
      console.log(this.alumnos)
    });
  }
  listasCursos(){
    this.cursoService.getCursos().subscribe((data)=>{
      this.cursos=data;
      console.log(this.cursos)
    });
  }
  listarNotas() {
    this.notaService.getNotas().subscribe(
        data => {
            console.log('Datos recibidos:', data);
            this.notas = data;
        },
        error => console.error('Error al obtener notas:', error)
    );
  }
  showDialogCreate(){
    this.titulo="Crear Nota"
    this.opc="Save";   
    this.op=0;
    this.visible = true; // Cambia la visibilidad del diálogo
  }
  showDialogEdit(id:number){
    this.titulo="Editar Nota"
    this.opc="Editar"; 
   this.notaService.getNotaByID(id).subscribe((data)=>{
      this.nota=data; 
      this.op=1;     
      
   });    
    this.visible = true; // Cambia la visibilidad del diálogo
  }
  deleteNota(id:number){
    this.isDeleteInProgress = true;
    this.notaService.deleteNota(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Correcto',
          detail: 'Nota eliminada',
        });
        this.isDeleteInProgress = false;
        this.listarNotas();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el Coche',
        });
      },
    });
  }
  opcion(){
    if(this.op==0){
      this.addNota();
      this.limpiar();
    }else if(this.op==1){
      console.log("Editar");
      this.updateNota();
      this.limpiar();
    }else{
      console.log("No se hace nada");
      this.limpiar();
    }
  }
  addNota(){
    this.notaService.crearNota(this.nota).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Nota Registrada',
        });
        this.listarNotas();
        this.op=0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo Crear la Nota',
        });
      },
    });    
    this.visible = false;
  }
  updateNota() {
    this.notaService.updateNota(this.nota.id, this.nota).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success', 
          summary: 'Correcto',
          detail: 'Nota editado',
        });
        this.listarNotas();
        this.op = 0;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error', 
          detail: 'No se pudo editar la Nota',
        });
      },
    });
    this.visible = false;
  }
  limpiar(){
    this.titulo='';
    this.opc='';
    this.op = 0; 
    this.nota.id=0;
    this.nota.curso;
    this.nota.alumno;
    this.nota.nota1=0;
    this.nota.nota2=0;
    this.nota.nota3=0;
    this.nota.promedio=0;
  }
  calcularPromedio() {
  const { nota1, nota2, nota3 } = this.nota;
  this.nota.promedio = (nota1 + nota2 + nota3) / 3;
}
  
} 