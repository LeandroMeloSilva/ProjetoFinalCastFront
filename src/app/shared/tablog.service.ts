import { Tablog } from './tablog.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TablogService {

  constructor(private http: HttpClient) { }

  readonly baseURL = 'https://localhost:44360/api/Logs'
  formData: Tablog = new Tablog();
  list: Tablog[];

  postServico() {
    return this.http.post(this.baseURL, this.formData);
  }

  putTablog() {
    return this.http.put(`${this.baseURL}/${this.formData.logId}`, this.formData);
  }

  deleteTablog(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res =>this.list = res as Tablog[]);
  }


}
