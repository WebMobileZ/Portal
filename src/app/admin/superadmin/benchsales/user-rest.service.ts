import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserRestService {
  users: Array<{ id: number, name: string, email: string }> = [];
  constructor(private http: HttpClient) { }


  getConsultants(page: any): Observable<any> {
    const pagenumber: any = page.first / 20;
    let actionList = page.filters;
    let params = new HttpParams();
    params = params.append('page', pagenumber);
    if (Object.keys(actionList).length) {
      for (let id in actionList) {
        params = params.append(id, actionList[id]['value']);
      }
    }
    const filtersParams = { params: params };
    return this.http.get(`${environment.api}/submissions`, filtersParams);

  }
  storeUser(form): Observable<any> {
    return this.http.post(`${environment.api}/submissions`, form.value);
  }
  getConsultantsOnly(): Observable<any> {
    return this.http.get(`${environment.api}/getConsultantsOnly/`);
  }
  storeClient(form): Observable<any> {
    return this.http.post(`${environment.api}/clients`, form.value);
  }
  updateSubmission(form, id): Observable<any> {
    return this.http.put(`${environment.api}/submissions/` + id, form.value);
  }
  storeVendor(form): Observable<any> {
    return this.http.post(`${environment.api}/vendorlist`, form.value);
  }
  storeContact(form): Observable<any> {
    return this.http.post(`${environment.api}/contactslist`, form.value);
  }

  statusChangeConsultant(index): Observable<any> {

    return this.http.post(`${environment.api}/status-consultant`, index);
  }
  getConsultantsList(): Observable<any> {
    return this.http.get(`${environment.api}/getConsultantsList/`);
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
  updateUser(form, id): Observable<any> {
    return this.http.put(`${environment.api}/jobs/` + id, form.value);
  }
  storeDocument(document): Observable<any> {

    return this.http.post(`${environment.api}/saveDocument`, document);
  }
  getContactDetails(index): Observable<any> {

    return this.http.post(`${environment.api}/contactsDetails`, index);
  }

}
