import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import * as authActions from '../actions/auth.actions';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions,
              private http: HttpClient) {}

  /** Notice, effects are properties of type Observable<T> on a class
   * ngrx knows about these because you pass these to the ngrx Effects
   * module in the Angular module in which ngrx is configured.
   */
  @Effect()
  loadAuths$: Observable<Action> = this.actions$.pipe(
    ofType(authActions.AuthActionTypes.LoadAuths),
    switchMap(() => {
      return of(new authActions.SetAuths('Robby'));
      // return this.http.get<string>('login')
      //   .pipe(
      //     map((userName) => {
      //       return new authActions.SetAuths(userName);
      //     })
      //   )
    })
  );
}
