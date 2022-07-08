import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });

    //An observable is a data source of any type, for example a https request, that might provide data at any point in time. An observer can subscribe to an observable just like you can subsribe to a newspaper. You'll be delivered the data as soon as the observable provides it.  Additionally the observable can pass on an error or can inform the observer that it is completed.
    const customIntervalObservable = new Observable(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 5) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater 3!'));
        }
        count++;
      }, 1000);
    });

    // A pipe is a intermediary between obervable and observer which allows you to process the provided data in a certain way before forwarding it to the subscribing observer. We assign this description inorder to cancel it later.
    this.firstObsSubscription = customIntervalObservable.pipe(filter(data => {
      return data > 0;
    }), map((data: number) => {
      return 'Round: ' + (data + 1);
    })).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log('Completed!');
    });
  }

  //Observables proprietary to angular are being unsubscribe automatically as soon as the ngOnDestroy lifecylce hook is triggered aka when the component disappears from the view. Custom observables however need to be unsubscribed manually. Otherwise the subscription keeps running forever, gathering possibly massive amounts of data, slowing down the app. 
  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }

}
