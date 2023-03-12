import { Injectable } from '@angular/core';
import { Observable, of, map, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor() {}

  logIn(login: string, password: string): Observable<boolean> {
    const observable$ = of({ login: 'admin', password: 'admin' }).pipe(
      delay(1000)
    );
    observable$.subscribe(console.log);

    return observable$.pipe(
      map((res: { login: string; password: string }) => {
        return res.login === login && res.password === password
          ? (this.isLoggedIn = true)
          : (this.isLoggedIn = false);
      })
    );
  }

  logOut(): void {
    this.isLoggedIn = false;
  }
}
