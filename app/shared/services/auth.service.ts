import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthService implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        // this.router.navigate(['/login'], { queryParams: { returnUrl: decodeURIComponent(state.url) }});
        this.router.navigate(['/login']);
        return false;
    }

    // login(username: string, password: string) {
    //     return this.http.post('/api/authenticate', JSON.stringIfy({ username: username, password: password }))
    //         .map((response: Response) => {
    //             // login successful if there's a jwt token in the response
    //             let user = response.json();
    //             if (user && user.token) {
    //                 // store user details and jwt token in local storage to keep user logged in between page refreshes
    //                 localStorage.setItem('currentUser', JSON.stringIfy(user));
    //             }
    //         });
    // }

    // logout() {
    //     // remove user from local storage to log user out
    //     localStorage.removeItem('currentUser');
    // }

}
