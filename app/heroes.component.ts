import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';


@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: 'heroes.component.html',
  styleUrls: ['heroes.component.css']
})
/* ?? learn more about pipe: https://angular.io/docs/ts/latest/guide/pipes.html (e.g: {{selectedHero.name | uppercase}} is my hero)
*/
export class HeroesComponent implements OnInit {
  title = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private router:Router,
    private heroService: HeroService) { }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
  this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string): void {
    name = name.trim();

    if (!name) { return; }
    this.heroService.create(name)
        .then(hero => { // ?? why hero here: possible: the create function return a Hero type object, the then callback function catch it, then push into the 2 way binding model (to update the list in client)
          this.heroes.push(hero);
          this.selectedHero = null;
        })
  }

  delete(hero: Hero): void {
    this.heroService
        .delete(hero.id)
        .then(() => {
          this.heroes = this.heroes.filter(h => h !== hero); // remove deleted hero from 2 way binding model
          if (this.selectedHero === hero) { this.selectedHero = null; } // remove selected flag
        });
  }
}
