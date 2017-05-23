import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';
import { Hero } from './hero';
import { Arm } from './arm';
import { HttpInterceptorService } from 'ng-http-interceptor';

@Injectable()
export class HeroService {
  requests = [];
  res = null;
  error = null;
 constructor(
    private http: Http,
    private httpInterceptor: HttpInterceptorService
    ) {
      httpInterceptor.request().addInterceptor((data, method) => {
      console.log(method, data);
      return data;
    });
 
    httpInterceptor.response().addInterceptor((res, method) => {
      return res.do(r => console.log(method, r));
    });

  }
 private heroesUrl = 'api/heroes';  // URL to web api API address
 private armsUrl = 'api/arms';  // URL to web api API address

 private headers = new Headers({'Content-Type': 'application/json'});

  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
  const url = `${this.heroesUrl}/${id}`;
  return this.http.delete(url, {headers: this.headers})
    .toPromise()
    .then(() => null)
    .catch(this.handleError);
  }

  getHeroes(): Promise<Hero[]> {
   return this.http.get(this.heroesUrl)
    .toPromise()
    .then(response => response.json().data as Hero[])// function(response){ return response.json().data}
    .catch(this.handleError);//handle exceptions
  }

  getArms(): Promise<Arm[]>{
   return this.http.get(this.armsUrl)
    .toPromise()
    .then(response => response.json().data as Arm[])// function(response){ return response.json().data}
    .catch(this.handleError);//handle exceptions
  }

  getHero(id: number): Promise<Hero> {
  const url = `${this.heroesUrl}/${id}`;
  return this.http.get(url)
    .toPromise()
    .then(response => response.json().data as Hero)
    .catch(this.handleError);
}

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
