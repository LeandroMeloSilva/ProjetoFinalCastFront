import { Component, OnInit } from '@angular/core';
import { CursoService } from '../shared/curso.service';
import { Curso } from '../shared/curso.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { CategoriaService } from '../shared/categorias.service';
import { Categoria } from '../shared/categorias.model';



@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  cursos: any;
  public filter: string = '';
  public filterDate: string = '';
  public data = new Date();


  constructor(public service: CursoService, public categoriaservice: CategoriaService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
    this.getCategoria();
  }
  public listaCategoria: Categoria[];

  getCategoria() {
    this.categoriaservice.getCategoria().subscribe(
      (res: any) => { this.listaCategoria = res; }
    )
  }

  populateForm(selectedRecord: Curso) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (confirm('Tem certeza que deseja deletar?')) {
      this.service.deleteCurso(id)
        .subscribe(
          res => {
            this.service.refreshList();
            this.toastr.error("Excluído com sucesso", 'Dados apagados com sucesso');
          },
          err => {
            console.log(err);
            this.toastr.error(err.error);
          }
        )
    }
  }
  onSubmit(form: NgForm) {
    if (this.service.formData.cursoId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postCurso().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Curso cadastrado com sucesso', 'Dados gravados com sucesso')
      },
      err => {
        console.log(err);
        this.toastr.error(err.error);
      }
    );
  }

  updateRecord(form: NgForm) {
    this.service.putCurso().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Atualizado com sucesso', 'Dados modificados com sucesso')
      },
      err => {
        console.log(err);
        this.toastr.error(err.error);
      }
    );
  }


  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new Curso();
  }

}
