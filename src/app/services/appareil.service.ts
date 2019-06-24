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
  //Allume un seul appareil en fonction de son index
  switchOnOne(i: number){
    this.appareils[i].status = 'allumé';
    this.emitAppareilSubject();
  }
  //Éteint un seul appareil en fonction de son index
  switchOffOne(i: number){
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
  // Cette méthode crée un objet du bon format et attribue le nom et le statut qui lui sont passés comme arguments.
  // La ligne pour l'id prend l'id du dernier élément actuel de l'array et ajoute 1.
  // Ensuite l'objet complété est ajouté à l'array et le Subject est déclenché pour tout garder à jour
  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: '',
      status: ''
    };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }

  constructor() { }
}

  
