import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {environment} from "../../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class UserRestService {
  users: Array<{id: number, name: string, email: string}> = [];
  constructor(private http: HttpClient) { }


  getConsultants(): Observable<any> {
    return this.http.get(`${environment.api}/interviewsubmissions`);
  }
  storeUser(form): Observable<any> {
    return this.http.post(`${environment.api}/submissions`,form.value);
  }
 statusChangeConsultant(index): Observable<any> {

    return this.http.post(`${environment.api}/status-consultant`,index);
  }
  getConsultantsList(): Observable<any> {
    return this.http.get(`${environment.api}/getConsultantsList`);
  }
  editUser(id): Observable<any> {
    return this.http.get(`${environment.api}/jobs/` + id);
  }
  editVenodr(id): Observable<any> {
    return this.http.get(`${environment.api}/contacts/` + id);
  }
  editConsultant(id): Observable<any> {
    return this.http.get(`${environment.api}/store-consultant/` + id);
  }
  updateUser(form,id): Observable<any> {
    return this.http.put(`${environment.api}/jobs/` + id, form.value);
  }
  storeDocument(document): Observable<any> {

    return this.http.post(`${environment.api}/saveDocument`, document);
  }
  getContactDetails(index): Observable<any> {

    return this.http.post(`${environment.api}/contactsDetails`,index);
  }

}
