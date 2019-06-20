import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth = false;

  signIn() { // athentifie l'utilisateur automatiquement au bout de 2 secondes
    return new Promise(
      (resolve,reject) => {
        setTimeout(
          () => {
            this.isAuth = true;
            resolve(true);
          }, 2000
        );
      }
    );
  }

  signOut(){ // Deconnexion
    this.isAuth = false;
  }

  constructor() { }
}
