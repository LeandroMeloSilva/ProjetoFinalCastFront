import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { CursoComponent } from './curso/curso.component';
import { TablogComponent } from './tablog/tablog.component';


const routes: Routes = [
   { path: 'home', component: HomeComponent },
   { path: '', component: HomeComponent },
   { path: 'Curso', component: CursoComponent},
   { path: 'Tablog', component: TablogComponent},

];



@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ToastrModule.forRoot()
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
