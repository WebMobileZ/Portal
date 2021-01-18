import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {environment} from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class SuperAdminRestService {
  users: Array<{id: number, name: string, email: string}> = [];
  constructor(private http: HttpClient) { }
/* get User Services */
  getUsers(): Observable<any> {
    return this.http.get(`${environment.api}/user-list`);
  }

  editUser(id): Observable<any> {
    return this.http.get(`${environment.api}/user-list/` + id);
  }

  updateUser(form,id): Observable<any> {
    return this.http.put(`${environment.api}/user-list/` + id, form.value);
  }

  storeUser(form): Observable<any> {
    return this.http.post(`${environment.api}/user-list`,form.value);
  }

  deleteUser(id): Observable<any> {
    return this.http.delete(`${environment.api}/user-list/` + id);
  }
/* Documents */
  getTotalInterviewShecdules(index): Observable<any> {
    return this.http.post(`${environment.api}/getTotalInterviewShecdules`,index);
  }
  EditDocument(id): Observable<any> {
    return this.http.get(`${environment.api}/submissions/`+ id);
  }
  getConsultants(): Observable<any> {
    return this.http.get(`${environment.api}/getAllConsultantsAdmin`);
  }
  getConsultantsInactive(): Observable<any> {
    return this.http.get(`${environment.api}/getAllConsultantsAdminInactive`);
  }
  getConsultantsPlaced(): Observable<any> {
    return this.http.get(`${environment.api}/getAllConsultantsAdminPlaced`);
  }
  updateConsultantStatus(form,id): Observable<any> {
    return this.http.put(`${environment.api}/admin-store-consultant/` + id, form.value);
  }


}
