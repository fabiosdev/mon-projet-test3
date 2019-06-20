import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authStatus: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authStatus = this.authService.isAuth;
  }
  //  On crée les 2 méthodes pour les boutons de connexion et deconnexion qui s'afficheront de manière contextuelle
  // puisque la méthode signIn() du service retourne une Promise, on peut employer une fonction callback asynchrone avec .then() pour éxécuter du code une fois la Promise résolue

  onSignIn(){
    this.authService.signIn().then(
      () => {
        console.log("Sign in successfull");
        this.authStatus = this.authService.isAuth;
        this.router.navigate(['appareils']);
        // La fonction navigate prend comme argument un array d'éléments
      }
    );
  }
  onSignOut(){
    this.authStatus = this.authService.isAuth;
  }

}
