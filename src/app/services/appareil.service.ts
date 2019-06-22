import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable({
  providedIn: 'root'
})
export class AppareilService {
  
  // Quand on déclare un Subject, il faut dire quel type de données il gèrera.
  appareilsSubject = new Subject<any[]>();

  private appareils = [
    {
      id: 1,
      name: 'Machine à laver',
      status: 'éteint'
    },
    {
      id: 2,
      name: 'Frigo',
      status: 'allumé'
    },
    {
      id: 3,
      name: 'Ordinateur',
      status: 'éteint'
    }
  ];
  emitAppareilSubject() {
    this.appareilsSubject.next(this.appareils.slice());
  }
  switchOnAll(){
    for(let appareil of this.appareils){
      appareil.status = 'allumé';
    }
    this.emitAppareilSubject();
  }
  switchOffAll(){
    for(let appareil of this.appareils){
      appareil.status = 'éteint';
      this.emitAppareilSubject();
    }
  }
  switchOnOne(i: number){ //Allume un seul appareil en fonction de son index
    this.appareils[i].status = 'allumé';
    this.emitAppareilSubject();
  }
  switchOffOne(i: number){ //Éteint un seul appareil en fonction de son index
    this.appareils[i].status = 'éteint';
    this.emitAppareilSubject();
  }

  getAppareilById(id: number) {
    const appareil = this.appareils.find(
      (s) => {
        return s.id === id;
      }
    );
    return appareil;
  }

  constructor() { }
}

  
