import { Injectable } from '@angular/core';
import { ObservedValueOf, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
// /api/users/1
import { Observable } from 'rxjs/internal/Observable';
import {environment} from "../../../environments/environment";
@Injectable()
export class UserService {
  constructor(private http:HttpClient ) { }

    loadUser():Observable <object> {
      return this.http.get(`${environment.api}/user-list/create`).pipe(
      );
    }

}
