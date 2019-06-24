import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';


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

  constructor(private httpClient: HttpClient) { }

  saveAppareilsToServer() {
    // la méthode  post() , qui permet de lancer un appel POST, prend comme premier argument l'URL visée, et comme deuxième argument le corps de l'appel, c'est-à-dire ce qu'il faut envoyer à l'URL ;
    this.httpClient
    // l'extension  .json  de l'URL est une spécificité Firebase, pour lui dire que vous lui envoyez des données au format JSON ;
    // la méthode  post()  retourne un Observable — elle ne fait pas d'appel à elle toute seule.  C'est en y souscrivant que l'appel est lancé ;
      .put('https://mon-projet-test3.firebaseio.com/appareils.json', this.appareils)
      // dans la méthode  subscribe() , vous prévoyez le cas où tout fonctionne et le cas où le serveur vous renverrait une erreur.
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
  /*Comme pour  post()  et  put() , la méthode get() retourne un Observable, mais puisqu'ici, vous allez recevoir des données, 
  TypeScript a besoin de savoir de quel type elles seront (l'objet retourné est d'office considéré comme étant un Object).  
  Vous devez donc, dans ce cas précis, ajouter  <any[]>  pour dire que vous allez recevoir un array de type  any , et que donc 
  TypeScript peut traiter cet objet comme un array : si vous ne le faites pas, TypeScript vous dira qu'un array ne peut pas être redéfini comme Object.*/
  getAppareilsFromServer() {
    this.httpClient
      .get<any[]>('https://mon-projet-test3.firebaseio.com/appareils.json')
      .subscribe(
        (response) => {
          this.appareils = response;
          this.emitAppareilSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
}

  
