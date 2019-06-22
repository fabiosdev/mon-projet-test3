import { Component, OnInit } from '@angular/core';
import { AppareilService } from './services/appareil.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core';
// Le premier import sert à rendre dispo le service Observable
import 'rxjs/add/observable/interval';

// Le deuxième donne accès à la méthode utilisée  ; interval() , qui crée un observable qui émet un chiffre croissant à intervalles reguliers et qui prend le nombre de millisecondes souhaité pour l'intervalle comme argument

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'mon-projet-test2';
  isAuth = false;

  appareils:any[]; // On déclare ici Appareil simplement comme un array de type any

  //lastUpdate = new Date();

  /*appareilOne = 'Machine à laver';
  appareilTwo = 'Frigo';
  appareilThree = 'Ordinateur';*/

  /*appareils =[
    {
      name: 'Machine à laver',
      status: 'éteint'
    },
    {
      name: 'Frigo',
      status: 'allumé'
    },
    {
      name: 'Ordinateur',
      status: 'éteint'
    }
  ];*/

  constructor(private appareilService: AppareilService){
    setTimeout(
      ()=>{
        this.isAuth = true;
      },4000
    );
  }
  secondes: number;
  counterSubscription: Subscription;

  ngOnInit(){
    // this.appareils = this.appareilService.appareils;
    const counter = Observable.interval(1000);
    //la fonction  subscribe()  prend comme arguments trois fonctions anonymes 
    this.counterSubscription = counter.subscribe(
      //la première se déclenche à chaque fois que l'Observable émet de nouvelles données, et reçoit ces données comme argument ;
      (value) => {
        this.secondes  = value;
      },
      //la deuxième se déclenche si l'Observable émet une erreur, et reçoit cette erreur comme argument ;
      (error) => {
        console.log('Uh-oh, an arror occured! : ' + error);
      },
      //la troisième se déclenche si l'Observable s'achève, et ne reçoit pas d'argument.
      () => {
        console.log('Observable complete!');
      }
    );
  }

  //  La fonction  unsubscribe()  détruit la souscription et empêche les comportements inattendus liés aux Observables infinis
  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }
}
