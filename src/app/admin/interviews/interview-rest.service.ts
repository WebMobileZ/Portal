import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class InterviewRestService {
  users: Array<{id: number, name: string, email: string}> = [];
  constructor(private http: HttpClient) { }


  getConsultants(): Observable<any> {
    return this.http.get('http://localhost:8000/api/interviewsubmissions/');
  }
  storeUser(form): Observable<any> {
    return this.http.post('http://localhost:8000/api/submissions',form.value);
  }
 statusChangeConsultant(index): Observable<any> {

    return this.http.post('http://localhost:8000/api/status-consultant',index);
  }
  getConsultantsList(): Observable<any> {
    return this.http.get('http://localhost:8000/api/getConsultantsList/');
  }
  editUser(id): Observable<any> {
    return this.http.get('http://localhost:8000/api/jobs/' + id);
  }
  editVenodr(id): Observable<any> {
    return this.http.get('http://localhost:8000/api/contacts/' + id);
  }
  editConsultant(id): Observable<any> {
    return this.http.get('http://localhost:8000/api/store-consultant/' + id);
  }
  updateUser(form,id): Observable<any> {
    return this.http.put('http://localhost:8000/api/jobs/' + id, form.value);
  }
  storeDocument(document): Observable<any> {

    return this.http.post('http://localhost:8000/api/saveDocument', document);
  }
  getContactDetails(index): Observable<any> {

    return this.http.post('http://localhost:8000/api/contactsDetails',index);
  }

}
