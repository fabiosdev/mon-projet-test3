import { Component, Input, OnInit } from '@angular/core';
import {AppareilService} from '../services/appareil.service';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {

  /*appareilName: string = 'Machine à laver';
  appareilStatus : string = 'éteint';*/

  @Input() appareilName: string; // on crée ce décorateur que l'on va fixer depuis la balise <app-appareil>
  @Input() appareilStatus: string;
  @Input() index: number; // récupère la variable index en property binding
  @Input() id: number; // Récupère l'ID de l'appareil

  constructor(private appareilService: AppareilService) { }

  ngOnInit() {
  }

  getStatus(){
    return this.appareilStatus;
  }
  getColor(){
    if(this.appareilStatus ==='allumé'){
      return 'green';
    }
    else if(this.appareilStatus === 'éteint'){
      return 'red';
    }
  }
  onSwitch(){ //Méthode qui allume ou éteint les appareils en fonction de son statut actuel
    if(this.appareilStatus === 'allumé') {
      this.appareilService.switchOffOne(this.index);
    }
    else if(this.appareilStatus === 'éteint') {
      this.appareilService.switchOnOne(this.index);
    }
  }

}
