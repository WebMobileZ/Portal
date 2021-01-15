import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {environment} from "../../../environments/environment";
import { HttpParams } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class UserRestService {
  users: Array<{id: number, name: string, email: string}> = [];
  constructor(private http: HttpClient) { }

  getConsultants(page:any): Observable<any> {
    const pagenumber:any =page.first/20;
    let str:any;
    let actorList = page.filters;

    let params = new HttpParams();
    console.log(Object.keys(actorList).length)
    params = params.append('page', pagenumber);
        if(Object.keys(actorList).length)
        {
         /* if(actorList['user_details.name'])
          params = params.append('name', actorList['user_details.name']['value']);

          if(actorList['vendorStatus'])
          params = params.append('vendorStatus', actorList['vendorStatus']['value']);
          if(actorList['vendorCompanyName'])
          params = params.append('vendorCompanyName', actorList['vendorCompanyName']['value']);
          if(actorList['vendorName'])
          params = params.append('vendorName', actorList['vendorName']['value']);
          if(actorList['vendorEmail'])
          params = params.append('vendorEmail', actorList['vendorEmail']['value']);
          if(actorList['created_at'])
          params = params.append('created_at', actorList['created_at']['value']); */
          if(actorList['consultant.consultatName'])
          params = params.append('consultatName', actorList['consultant.consultatName']['value']);
       for (let id in actorList) {

          params = params.append(id, actorList[id]['value']);
        }
      }
    const opts = { params: params };
    return this.http.get(`${environment.api}/submissions`, opts);
   // const pagenumber:any =page.first/20;



//this.http.get(`${environment.api}/submissions`,  params);
  //  return this.http.get(`${environment.api}/submissions?page=`+pagenumber+'filters'+);
  }
  getMySubmissions(page:any): Observable<any> {
    const pagenumber:any =page.first/20;
    let str:any;
    let actorList = page.filters;

    let params = new HttpParams();
    console.log(Object.keys(actorList).length)
    params = params.append('page', pagenumber);
        if(Object.keys(actorList).length)
        {
         /* if(actorList['user_details.name'])
          params = params.append('name', actorList['user_details.name']['value']);

          if(actorList['vendorStatus'])
          params = params.append('vendorStatus', actorList['vendorStatus']['value']);
          if(actorList['vendorCompanyName'])
          params = params.append('vendorCompanyName', actorList['vendorCompanyName']['value']);
          if(actorList['vendorName'])
          params = params.append('vendorName', actorList['vendorName']['value']);
          if(actorList['vendorEmail'])
          params = params.append('vendorEmail', actorList['vendorEmail']['value']);
          if(actorList['created_at'])
          params = params.append('created_at', actorList['created_at']['value']); */
          if(actorList['consultant.consultatName'])
          params = params.append('consultatName', actorList['consultant.consultatName']['value']);
       for (let id in actorList) {

          params = params.append(id, actorList[id]['value']);
        }
      }
    const opts = { params: params };
    return this.http.get(`${environment.api}/getMySubmissions`, opts);
   // const pagenumber:any =page.first/20;



//this.http.get(`${environment.api}/submissions`,  params);
  //  return this.http.get(`${environment.api}/submissions?page=`+pagenumber+'filters'+);
  }
  storeUser(form): Observable<any> {
    return this.http.post(`${environment.api}/submissions`,form.value);
  }

  storeClient(form): Observable<any> {
    return this.http.post(`${environment.api}/clients`,form.value);
  }
updateSubmission(form,id): Observable<any> {
  return this.http.put(`${environment.api}/submissions/` + id, form.value);
}
  storeVendor(form): Observable<any> {
    return this.http.post(`${environment.api}/vendorlist`,form.value);
  }
  storeContact(form): Observable<any> {
    return this.http.post(`${environment.api}/contactslist`,form.value);
  }

 statusChangeConsultant(index): Observable<any> {

    return this.http.post(`${environment.api}/status-consultant`,index);
  }
  getConsultantsList(): Observable<any> {
    return this.http.get(`${environment.api}/getConsultantsList/`);
  }
  getConsultantsOnly(): Observable<any> {
    return this.http.get(`${environment.api}/getConsultantsOnly/`);
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
