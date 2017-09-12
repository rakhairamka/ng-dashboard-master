import { Injectable ,Input } from '@angular/core';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';

@Injectable()
export class RestaurantService {

    private details = {};
    private restaurantDetails = new BehaviorSubject<Object>(this.details);
    restaurantDetailsAsObservable = this.restaurantDetails.asObservable();

    setRestaurantDetails(details : Object){
        this.restaurantDetails.next(details);
    }

    getRestaurantDetails(){
        return this.restaurantDetails.getValue();
    }

}