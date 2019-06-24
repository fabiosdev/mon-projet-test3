import { Injectable } from '@angular/core';
import { User } from  '../models/User.model';
import { Subject } from "rxjs/Subject";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    new User(
      'Fabien',
      'Sepchat',
      'fabien.sepchat@orange.fr',
      'jus de pomme',
      ['coder', 'boire du café'])
  ];
  userSubject = new Subject<User[]>();

  emitUsers() {
    this.userSubject.next(this.users.slice());
  }
  addUser(user: User) {
    this.users.push(user);
    this.emitUsers();
  }

  // Ce service contient un array privé d'objets de type personnalisé User et un Subject pour émetttre cet array
  // La méthode emitUsers() déclenche ce subject et la méthode addUser() ajoute un objet à l'array, puis déclenche le subject
  constructor() { }
}
