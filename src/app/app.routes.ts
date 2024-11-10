import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CursoComponent } from './curso/curso.component';
import { AlumnoComponent } from './alumno/alumno.component';
import { NotaComponent } from './nota/nota.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'curso',
        component: CursoComponent,
        title: 'Curso'
    },
    {
        path: 'nota',
        component: NotaComponent,
        title: 'Nota'
    },
    {
        path: 'alumno',
        component: AlumnoComponent,
        title: 'Alumno'
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
