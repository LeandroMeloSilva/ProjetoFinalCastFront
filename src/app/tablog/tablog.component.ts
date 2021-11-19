import { Component, OnInit } from '@angular/core';
import { TablogService } from '../shared/tablog.service';
import { Tablog } from '../shared/tablog.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { CategoriaService } from '../shared/categorias.service';
import { Categoria } from '../shared/categorias.model';

@Component({
  selector: 'app-tablog',
  templateUrl: './tablog.component.html',
  styleUrls: ['./tablog.component.css']
})
export class TablogComponent implements OnInit {

  constructor(public service: TablogService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }
  onSubmit(form: NgForm) {
    if (this.service.formData.logId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postServico().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Enviado com Sucesso!', 'Detalhe de cliente cadastrado com Sucesso!')
      },
      err => { console.log(err); }
    );
  }

  updateRecord(form: NgForm) {
    this.service.putTablog().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Atualizado com Sucesso!', 'Detalhe de serviço atualizado com Sucesso!')
      },
      err => { console.log(err); }
    );
  }


  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new Tablog();
  }

  populateForm(selectedRecord: Tablog) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (confirm('Tem Certeza que Deseja Deletar esse Registro?')) {
      this.service.deleteTablog(id)
        .subscribe(
          res => {
            this.service.refreshList();
            this.toastr.error("Deletado com Sucesso", 'Detalhe de serviço');
          },
          err => { console.log(err); }
        )
    }
  }

}
