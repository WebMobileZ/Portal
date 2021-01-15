import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {environment} from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class UserRestService {
  users: Array<{id: number, name: string, email: string}> = [];
  constructor(private http: HttpClient) { }

  getTimeSheet(): Observable<any> {
    return this.http.get(`${environment.api}/getAllTimesheets`);
  }
  getConsultants(): Observable<any> {
    return this.http.get(`${environment.api}/jobs/`);
  }
  storeUser(form): Observable<any> {
    return this.http.post(`${environment.api}/jobs`,form.value);
  }
 statusChangeConsultant(index): Observable<any> {

    return this.http.post(`${environment.api}/status-consultant`,index);
  }

  editUser(id): Observable<any> {
    return this.http.get(`${environment.api}/jobs/` + id);
  }
  updateUser(form,id): Observable<any> {
    return this.http.put(`${environment.api}/jobs/` + id, form.value);
  }
  storeDocument(document): Observable<any> {

    return this.http.post(`${environment.api}/saveDocument`, document);
  }
}
