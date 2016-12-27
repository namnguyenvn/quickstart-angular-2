import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise'; // ?? the Angular Observable doesn't have a toPromise operator => add this

import { Hero } from './hero';
// import { HEROES } from './mock-heroes'; use In Memory Web API Instead

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
                .toPromise() // ?? convert Observable to Promise
                .then(response => response.json().data as Hero[])
                .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.Message || error);
  }

  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
                .toPromise()
                .then(response => response.json().data as Hero)
                .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;

    return this.http
          .put(url, JSON.stringify(hero), {headers: this.headers})
          .toPromise()
          .then(() => hero) // ?? why () =>
          .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http
          .post(this.heroesUrl, JSON.stringify({name: name}),{headers: this.headers})
          .toPromise()
          .then(res => res.json().data) // ?? is this the response data that will be used in client
          .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete(url, {headers: this.headers})
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
  }

  /* V1:
  getHeroes(): Promise<Hero[]> {
    return Promise.resolve(HEROES);
  }*/

  /* V1:
  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
              .then(heroes => heroes.find(hero => hero.id === id));
  }*/
}
