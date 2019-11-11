import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = '/api';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public loggedUser: any;
  public response: any;
  constructor(private http: HttpClient) { }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }
  addUser(userData) {
    this.http.post('http://localhost:3000/register', userData ).subscribe( data => {
      console.log('register data in service: ' , data);
    });
  }
  getUser(user): Observable<any> {
    const url = 'http://localhost:3000/login';
    /*this.http.post('http://localhost:3000/login', user ).subscribe( data => {
      console.log('register data in service: ' , data);
    });*/
    this.response = this.http.post(url, user, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
    this.loggedUser = this.response.fname;
    return  this.response;
  }
  getUserTransactionDetails(): Observable<any> {
    const url = 'http://localhost:3000/getTransactionDetails';
    this.response = this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
    console.log('in auth servuce', this.response);
    return  this.response;
  }
  currentUser(): Observable<any> {
    return this.loggedUser;
  }
  logOutUser() {
    this.loggedUser = null;
    return  this.loggedUser;
  }
  updateUser(user): Observable<any>  {
    const url = 'http://localhost:3000/api/updateProfile';
    return this.http.put(url, user ).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
}
