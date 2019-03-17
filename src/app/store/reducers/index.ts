import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromAuth from './auth.reducer';

export interface State {
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

/** create feature selector used to retrieve the exported functions from feature-reducers,
 * each returning the various properties of their state object. It does this (as a function)
 * by retrieving a property from the main state object (see fromAuth.State above)
 */
export const selectAuthState = createFeatureSelector<fromAuth.State>('auth');

export const getUserName = createSelector(selectAuthState, fromAuth.getUserName);
