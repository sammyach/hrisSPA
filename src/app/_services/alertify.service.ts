import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  alerty;
  constructor() {
    this.alerty = alertify;
    this.alerty.set('notifier', 'position', 'top-center');
   }
  // alertify.set('notifier','position', 'top-center');
  success (message: string){
    this.alerty.success(message);
  }

  warning (message: string){
    this.alerty.warning(message);
  }

  error (message: string){
    this.alerty.error(message);
  }
}
