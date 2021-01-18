import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from "../../../environments/environment";
import { HttpParams } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ShareRestService {
  users: Array<{ id: number, name: string, email: string }> = [];
  constructor(private http: HttpClient) { }


  getConsultants(): Observable<any> {
    return this.http.get(`${environment.api}/getHotlistConsultants`);
  }

  getInterviewConsultants(): Observable<any> {
    return this.http.get(`${environment.api}/interviewsubmissions`);
  }
  statusChangeConsultant(index): Observable<any> {

    return this.http.post(`${environment.api}/status-consultant`, index);
  }
  createEmployeePortal(index): Observable<any> {

    return this.http.post(`${environment.api}/createEmployeePortal`, index);
  }
}
