import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {
  users: Array<{id: number, name: string, email: string}> = [];
  constructor(private http: HttpClient) { }


  getConsultants(): Observable<any> {
    return this.http.get('http://localhost:8000/api/getHotlistConsultants/');
  }
  getVendorContacts(): Observable<any> {
    return this.http.get('http://localhost:8000/api/contacts/');
  }
 statusChangeConsultant(index): Observable<any> {
  var body = 'index='+index;
    return this.http.post('http://localhost:8000/api/status-consultant',JSON.stringify({
      cmd: "sa",
      data: "sd"}));
  }
}
