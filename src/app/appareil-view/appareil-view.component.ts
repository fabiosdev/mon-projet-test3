import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit, OnDestroy {
  isAuth = false;
  appareils: any[];
  appareilSubscription: Subscription;

  lastUpdate = new Promise((resolve,reject)=>{
    const date = new Date();
    setTimeout(
      () =>{
        resolve(date);
      },2000
    );
  });

  constructor(private appareilService: AppareilService){
    setTimeout(
      ()=>{
        this.isAuth = true;
      },4000
    );
  }

  ngOnInit(){
    this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils;
      }
    );
    this.appareilService.emitAppareilSubject();
  }
  onAllumer(){
    this.appareilService.switchOnAll();
    console.log('On allume tout le bordel !');
  }
  onEteindre(){
    if(confirm("Etes-vous sûr de vouloir éteindre tous vos appareils ?")) {
      this.appareilService.switchOffAll();
    }
    else{
      return null;
    }
    console.log('On éteint tout le bordel !');
  }
  ngOnDestroy() {
    this.appareilSubscription.unsubscribe();
  }

}
