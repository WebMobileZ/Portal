import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {
  users: Array<{id: number, name: string, email: string}> = [];
  constructor(private http: HttpClient) { }
  EditDocument(id): Observable<any> {
    return this.http.get('http://localhost:8000/api/submissions/'+ id);
  }
  getTotalInterviewShecdules(index): Observable<any> {
      return this.http.post('http://localhost:8000/api/getTotalInterviewShecdules',index);
    }

  getConsultants(): Observable<any> {
    return this.http.get('http://localhost:8000/api/getAllConsultants/');
  }
  storeUser(form): Observable<any> {
    return this.http.post('http://localhost:8000/api/store-consultant',form.value);
  }
 statusChangeConsultant(index): Observable<any> {
  var body = 'index='+index;
    return this.http.post('http://localhost:8000/api/status-consultant',JSON.stringify({
      cmd: "sa",
      data: "sd"}));
  }
}
