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
  EditDocument(id): Observable<any> {
    return this.http.get(`${environment.api}/submissions/`+ id);
  }
  getTotalInterviewShecdules(index): Observable<any> {
      return this.http.post(`${environment.api}/getTotalInterviewShecdules`,index);
    }

  getConsultants(): Observable<any> {
    return this.http.get(`${environment.api}/getAllConsultants/`);
  }
  storeUser(form): Observable<any> {
    return this.http.post(`${environment.api}/store-consultant`,form.value);
  }
 statusChangeConsultant(index): Observable<any> {
  var body = 'index='+index;
    return this.http.post(`${environment.api}/status-consultant`,JSON.stringify({
      cmd: "sa",
      data: "sd"}));
  }
}
