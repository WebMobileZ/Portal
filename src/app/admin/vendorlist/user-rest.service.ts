import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from '../consultants/product';
@Injectable({
  providedIn: 'root'
})
export class UserRestService {
  users: Array<{id: number, name: string, email: string}> = [];
  constructor(private http: HttpClient) { }

  getTimeSheet(): Observable<any> {
    return this.http.get('http://localhost:8000/api/getAllTimesheets');
  }
  getConsultants(): Observable<Product> {
    return this.http.get('http://localhost:8000/api/getAllConsultants/');
  }
  getProductsSmall() {
    return this.http.get<any>('http://localhost:8000/api/getAllConsultants/')
    .toPromise()
    .then(res => <Product[]>res.timesheet)
    .then(data => { return data; });
}
  storeUser(form): Observable<any> {
    return this.http.post('http://localhost:8000/api/store-consultant',form.value);
  }
 statusChangeConsultant(index): Observable<any> {

    return this.http.post('http://localhost:8000/api/status-consultant',index);
  }

  editUser(id): Observable<any> {
    return this.http.get('http://localhost:8000/api/store-consultant/' + id);
  }
  updateUser(form,id): Observable<any> {
    return this.http.put('http://localhost:8000/api/store-consultant/' + id, form.value);
  }
  storeDocument(document): Observable<any> {

    return this.http.post('http://localhost:8000/api/saveDocument', document);
  }
  removeFile(document): Observable<any> {

    return this.http.post('http://localhost:8000/api/removeDocument', document);
  }
}
