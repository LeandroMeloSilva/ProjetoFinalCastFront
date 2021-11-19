import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from './categorias.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http : HttpClient) { }

  readonly baseURL = 'https://localhost:44360/api/Categorias'
  formData: Categoria = new Categoria();
  list: Categoria[];

  getCategoria(){
    return this.http.get(this.baseURL);
  }
}
