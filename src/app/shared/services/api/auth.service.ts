import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ILoginSuccess} from '@shared/interfaces';
import {selectorAuth} from '@app/auth/store/auth.reducer';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {filter} from 'rxjs/internal/operators';

@Injectable({providedIn: 'root'})
export class AuthService {
  current: ILoginSuccess = null;

  constructor(private http: HttpClient, private store: Store<any>) {
    this.store
      .pipe(
        select(selectorAuth),
        filter(state => !!state),
        map(state => state.user),
        distinctUntilChanged())
      .subscribe(user => {
        this.current = user;
      });
  }

  /**
   * Authentifier un utilisateur
   * @param username Nom d'utilisateur
   * @param password Mot de passe
   */
  login(username, password): Observable<ILoginSuccess> {
    return this.http.post<ILoginSuccess>('/login', {
      email: username,
      password: 'CryptoJS.SHA512(password).toString(CryptoJS.enc.Base64)'
    });
  }

  /**
   * Se déconnecter de l'application
   */
  logout(): Observable<any> {
    return this.http.post('/logout', {});
  }
}
