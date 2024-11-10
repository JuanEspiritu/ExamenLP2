import { CommonModule } from '@angular/common'; 
import { Component } from '@angular/core'; 
import { TableModule } from 'primeng/table'; 
import { SidebarComponent } from '../sidebar/sidebar.component'; 
import { MessageService } from 'primeng/api'; 
import { CardModule } from 'primeng/card'; 
import { PanelModule } from 'primeng/panel'; 
import { ToastModule } from 'primeng/toast'; 
import { ConfirmDialogModule } from 'primeng/confirmdialog'; 
import { DropdownModule } from 'primeng/dropdown'; 
import { DialogModule } from 'primeng/dialog'; 
import { InputTextModule } from 'primeng/inputtext'; 
import { FormsModule } from '@angular/forms'; 
import { Alumno } from './models/alumno';
import { AlumnoService } from './services/alumno.service';

@Component({ 
  selector: 'app-alumno', 
  standalone: true, 
  imports: [TableModule, SidebarComponent, CommonModule, CardModule, PanelModule, ToastModule,  
    ConfirmDialogModule, DropdownModule, DialogModule, InputTextModule, FormsModule], 
  templateUrl: './alumno.component.html', 
  styleUrl: './alumno.component.css' 
}) 
export class AlumnoComponent { 
  alumnos: Alumno[] = []; 
  alumno = new Alumno(); 
  titulo: string = ''; 
  opc: string = ''; 
  op = 0; 
  visible = false; 
  isDeleteInProgress = false; 

  constructor( 
    private alumnoService: AlumnoService, 
    private messageService: MessageService, 
  ) {} 
  ngOnInit() { 
    this.listarAlumnos(); 
  } 
  listarAlumnos(){ 
    this.alumnoService.getAlumnos().subscribe((data) => { 
      this.alumnos = data; 
      console.log(data) 
    }); 
  } 
  deleteAlumno(id: number) { 
    this.isDeleteInProgress = true; 
    this.alumnoService.deleteAlumno(id).subscribe({ 
      next: () => { 
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Correcto', 
          detail: 'Alumno eliminado', 
        }); 
        this.isDeleteInProgress = false; 
        this.listarAlumnos(); 
      }, 
      error: () => { 
        this.isDeleteInProgress = false; 
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: 'No se pudo eliminar el Alumno', 
        }); 
      }, 
    }); 
  } 
  showDialogEdit(id: number) { 
    this.titulo = 'Editar Alumno'; 
    this.opc = 'Editar'; 
    this.alumnoService.getAlumnoByID(id).subscribe((data) => { 
      this.alumno = data; 
      this.op = 1; 
      this.visible = true; 
    }); 
  } 
  showDialogCreate() { 
    this.titulo = 'Crear Alumno'; 
    this.opc = 'Agregar'; 
    this.op = 0; 
    this.visible = true; 
    this.alumno = { 
      id: 0, 
      nombres: '', 
      apellidos:'', 
      dni:'', 
    }; 
  } 
  addAlumno(): void { 
    if (!this.alumno.nombres ||!this.alumno.apellidos ||this.alumno.dni.trim() === '') { 
      this.messageService.add({ 
        severity: 'error', 
        summary: 'Error', 
        detail: 'El nombre del Alumno no puede estar vacío', 
      }); 
      return; 
    } 
    this.alumnoService.crearAlumno(this.alumno).subscribe({ 
      next: () => { 
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Correcto', 
          detail: 'Alumno registrado', 
        }); 
        this.listarAlumnos(); 
        this.op = 0; 
      }, 
      error: () => { 
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: 'No se pudo agregar el Alumno', 
        }); 
      }, 
    }); 
    this.visible = false; 
  } 
  updateAlumno() { 
    this.alumnoService.updateAlumno(this.alumno.id, this.alumno).subscribe({ 
      next: () => { 
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Correcto',
          detail: 'Alumno editado', 
        }); 
        this.listarAlumnos(); 
        this.op = 0; 
      }, 
      error: () => { 
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Error',  
          detail: 'No se pudo editar el Alumno', 
        }); 
      }, 
    }); 
    this.visible = false; 
  } 
  opcion():void{ 
    if(this.op==0){ 
      this.addAlumno(); 
      this.limpiar(); 
    }else if(this.op==1){ 
      console.log("Editar"); 
      this.updateAlumno(); 
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
    this.alumno.id=0;  
    this.alumno.nombres=''; 
    this.alumno.apellidos=''; 
    this.alumno.dni=''; 
   } 
} 

 

 