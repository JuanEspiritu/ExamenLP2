import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CursoService } from './services/curso.service';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Curso } from './models/curso';

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [TableModule, SidebarComponent, CommonModule, CardModule, PanelModule, ToastModule, 
    ConfirmDialogModule, DropdownModule, DialogModule, InputTextModule, FormsModule],
  templateUrl: './curso.component.html',
  styleUrl: './curso.component.css'
})
export class CursoComponent {
  cursos: Curso[] = [];
  curso = new Curso();
  titulo: string = '';
  opc: string = '';
  severity:'success'|'info'|'warning'|'danger' = 'success'; 
  op = 0;
  visible = false;
  isDeleteInProgress = false;

  constructor(
    private cursoService: CursoService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.listarCursos();
  }

  listarCursos(){
    this.cursoService.getCursos().subscribe((data) => {
      this.cursos = data;
      console.log(data)
    });
  }

  deleteCurso(id: number) {
    this.isDeleteInProgress = true;
    this.cursoService.deleteCurso(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Curso eliminado',
        });
        this.isDeleteInProgress = false;
        this.listarCursos();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el Curso',
        });
      },
    });
  }

  showDialogEdit(id: number) {
    this.titulo = 'Editar Curso';
    this.opc = 'Editar';
    this.severity = 'warning'; 
    this.cursoService.getCursoByID(id).subscribe((data) => {
      this.curso = data;
      this.op = 1;
      this.visible = true;
    });
  }

  showDialogCreate() {
    this.titulo = 'Crear Curso';
    this.opc = 'Agregar';
    this.op = 0;
    this.severity = 'success'; 
    this.visible = true;
    this.curso = {
      id: 0,
      nombre: '',
    };
  }

  addCurso(): void {
    if (!this.curso.nombre || this.curso.nombre.trim() === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El nombre del Curso no puede estar vacío',
      });
      return;
    }

    this.cursoService.crearCurso(this.curso).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Curso registrado',
        });
        this.listarCursos();
        this.op = 0;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo agregar el Curso',
        });
      },
    });
    this.visible = false;
  }
  
  updateCurso() {
    this.cursoService.updateCurso(this.curso.id, this.curso).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success', 
          summary: 'Correcto',
          detail: 'Curso editado',
        });
        this.listarCursos();
        this.op = 0;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error', 
          detail: 'No se pudo editar el Curso',
        });
      },
    });
    this.visible = false;
  }


  opcion():void{
    if(this.op==0){
      this.addCurso();
      this.limpiar();
    }else if(this.op==1){
      console.log("Editar");
      this.updateCurso();
      this.limpiar();
    }else{
      console.log("No se hace nada");
      this.limpiar();
    }
    
  }
  limpiar(){
    this.titulo='';
    this.opc='';
    this.op = 0; 
    this.curso.id=0;
    this.curso.nombre='';
   }
}