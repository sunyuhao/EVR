import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Evaluation } from '../class/evaluation';
import { CheckLogin } from '../class/check-login';
import { Organisation } from '../class/organisation'
import { SituationTravail } from '../class/situation-travail'

@Injectable()
export class MetierService {
  requests = [];
  res = null;
  error = null;


  //constructor
  constructor(private http: Http) { }
  //API URI
  private baseURL = 'http://dev-api.preventionbtp.fr/api/'

  //header


  getLoginToken(login: string, pass: string) {
    let body = new FormData();
    body.append('_username', login);
    body.append('_password', pass);
    return this.http
      .post(this.baseURL + 'login_check', body)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  getListSTByGroup(token: string, organizationId): Promise<SituationTravail[]> {
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    headers.append('Content-Type', 'application/ld+json');
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.baseURL + 'classe_situation_travails?myRepository=' + organizationId + '&order[code]=asc', options)
      .toPromise()
      .then(response => response.json()["hydra:member"] as SituationTravail[])
      .catch(this.handleError);//handle exceptions
  }














  getOrganisations(token: string): Promise<Organisation[]> {
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    headers.append('Content-Type', 'application/ld+json');
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.baseURL + 'groups', options)
      .toPromise()
      .then(response => response.json()["hydra:member"] as Organisation[])
      .catch(this.handleError);//handle exceptions
  }

  createEvaluation(token: string, name, mode, organizationId) {
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    headers.append('Content-Type', 'application/ld+json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      "name": name,
      "mode": mode,
      "organizationId": organizationId
    }
    let body = JSON.stringify(data);
    return this.http.post(this.baseURL + 'evaluations', body, options)
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);//handle exceptions
  }

  deleteEvaluation(token: string, evaluationId: number) {
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    headers.append('Content-Type', 'application/ld+json');
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(this.baseURL + 'evaluations/' + evaluationId, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);//handle exceptions
  }

  checkUser(token: string): Promise<CheckLogin> {
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.baseURL + 'check_user', options)
      .toPromise()
      .then(response => response.json().data as CheckLogin)
      .catch(this.handleError);//handle exceptions

  }

  //  search(term: string): Observable<Hero[]> {
  //     return this.http
  //                .get(this.baseURL+'?name=${term}')
  //                .map(response => response.json().data as Hero[]);
  //   }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


}
