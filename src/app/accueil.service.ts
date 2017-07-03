import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';

import { Evaluation } from './evaluation';

@Injectable()
export class AccueilService {
 requests = [];
  res = null;
  error = null;
  //constructor
  constructor(private http: Http) {}
  //API URI
  private evaluationsUrl = 'api/evaluations';
  //header
  private headers = new Headers({'Content-Type': 'application/json'});

  getEvaluations(): Promise<Evaluation[]> {
      return this.http.get(this.evaluationsUrl)
        .toPromise()
        .then(response => response.json().data as Evaluation[])// function(response){ return response.json().data}
        .catch(this.handleError);//handle exceptions
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


}
