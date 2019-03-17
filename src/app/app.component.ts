import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from './store/reducers';
import * as authActions from './store/actions/auth.actions';
import { of, Observable, Observer, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'ngrx-example';
  unSubscription: Subscription;
  un: string;
  username$:  Observable<string>;
  timer$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {}
 
  ngOnInit() {
    this.username$ = of('pending...');
    this.store.dispatch(new authActions.LoadAuths());
    this.username$ = this.store.select(fromRoot.getUserName);

    /** unrelated to ngrx, investigating observables */
    // this.timer$ = new Observable<string>((observer: Observer<string>) => {
    //   setInterval(() => observer.next(new Date().toString()), 1000);
    // });

    /** we write the subscribe function ('subscribe' here, but usually 
     * written as an arrow fn) with a single parameter, a function, of type
     * Observer<T> or Subscriber<T> (internally, Observers are converted to
     * Subscribers to provide unsubscribe functionality).
     * 
     * like resolve() and reject() for promises, the implementation for our
     * subscriber / observer is not built by me, the consumer. I simply call
     * next() error() or complete() to tell it what to do
     */
    this.timer$ = new Observable<string>(function subscribe(subscriber: Subscriber<string>) {
      setInterval(() => subscriber.next(new Date().toString()), 1000);
    });

    /** when calling subscribe, a Subscription object will be returned. You only need this
     * object when you need to unsubscribe later (such as in ngOnDestroy()). Most of the time,
     * you will pass the subscribe function an observer / subscriber, often created inline such
     * as below. to use the values delivered from the Observable you're subscribing to, you need
     * to assign the received values to something on your class object
     */
    this.unSubscription = this.timer$.subscribe((val: any) => {
      this.un = val;
    });


    /**
     * observable
     * observer / subscriber
     */
  }

  ngOnDestroy() {
    this.unSubscription.unsubscribe();
  }
}
