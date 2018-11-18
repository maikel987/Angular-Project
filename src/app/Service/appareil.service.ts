import {forEach} from '@angular/router/src/utils/collection';
import {Subject} from 'rxjs';
import {HttpClient} from "@angular/common/http"
import { Injectable } from '@angular/core';

@Injectable()
export class AppareilService {

  appareilSubject = new Subject<any[]>();

  private appareils = [];


constructor(private httpClient: HttpClient) {
  
}

  emitAppareilSubject() {
    this.appareilSubject.next(this.appareils.slice());
  }

  getAppareilById(id: number) {
    const appareil = this.appareils.find((c) => { return c.id === id; });
    return appareil;
  }

  switchOnAll() {
    for(let app of this.appareils) {
      app.status = 'allumé';
    }
    this.emitAppareilSubject();
  }

  switchOffAll() {
    for (let app of this.appareils) {
      app.status = 'éteint';
    }
    this.emitAppareilSubject();
  }

  SwitchOnOne(index: number) {
this.appareils[index].status = 'allumé';
    this.emitAppareilSubject();
  }

  SwitchOffOne(index: number) {
    this.appareils[index].status = 'éteint';
    this.emitAppareilSubject();
  }

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

  saveAppareilsToServer(){
    this.httpClient
    .put('https://http-client-demo-43bb3.firebaseio.com/appareils.json',this.appareils)
    .subscribe(
      () => {
        console.log('Enregistrement terminé');
      },
      (error) => {console.log('erreur de sauvegarde'+ error);}
      );
    
  }

  getAppareilsFromServer(){
    this.httpClient
    .get<any[]>('https://http-client-demo-43bb3.firebaseio.com/appareils.json')
    .subscribe(
      (response) => {  
        this.appareils = response; 
        this.emitAppareilSubject();
    },
      (error) => {console.log('Erreur de Chargement!  ' + error);}
    );
    }

}
