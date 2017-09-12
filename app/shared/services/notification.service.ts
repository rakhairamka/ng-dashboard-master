import { Injectable ,Input } from '@angular/core';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotificationService {
 
    notificationData  = new BehaviorSubject<any>({"isTrusted":false});
    notificationDataAsObservable = this.notificationData.asObservable();
    private notification;
    constructor(){
        // navigator.serviceWorker.addEventListener('message', function(event) {
        //     console.log('Received a message from service worker: ', event.data);
        //     this.notifyClient(event);
        // }.bind(this));
    }

    public notifyClient(msg : any){
      this.notificationData.next(msg);
    } 
}

 
