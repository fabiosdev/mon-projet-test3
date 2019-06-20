import { Component, OnInit } from '@angular/core';
import { AppareilService } from './services/appareil.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
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
  ngOnInit(){
    this.appareils = this.appareilService.appareils;
  }
}
