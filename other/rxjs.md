## RxJS resolve which kind of problems?

The impetus drives me to learn RxJS is that lots of people recommend it and said: `React + Redux + RxJS = Amazing!`.

Before learning it, there is a simple function: make an element is draggable.

Using DOM event to do, the code see in [JSFiddle](https://jsfiddle.net/c4bqungv/).

The example base on RxJS, the code see in [JSFiddle](https://jsfiddle.net/m2nqjft3/).

From these 2 examples, I feel RxJS is quite like Promise. Compared to traditional event system, it is easier to 
extend and package logic and variables in a function.

What's more, in it, it can return multiple values via `next()`. And using operators to process 
event stream.

There is an image to show it:

<img src="assets/rxjs_stream.png" width="400"/>

## Operator

Operators are methods on the Observable type, such as .map(...), .filter(...), .merge(...), etc. When called, they do not change the existing Observable instance. Instead, they return a new Observable, whose subscription logic is based on the first Observable.

<img src="assets/rxjs_operators.svg" width="400"/>

### pipe

Any functions can be in `pipe`, but finally, they need return an `Observable` instance.

### switchMap

A way to cancel stale events. An example as below:

```js
import { fromEvent, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const obs$1 = fromEvent(document, 'click');
const obs$2 = interval(1000);
const finalObs$ = obs$1.pipe(
  switchMap(event => obs$2)
);
const subscription = finalObs$.subscribe((value) => console.log(value));
```
 
### mergeMap

A way to merge events. An example as below:

```js
import { of } from 'rxjs';
import { mergeMap, map  } from 'rxjs/operators';

const firstNameObs$ = of('Naveen');
const lastNameObs$ = of('Chandupatla');
const finalObs$ = firstNameObs$.pipe(
  mergeMap(event1 => lastNameObs$.pipe(map(event2 => event1+' '+event2)))
);
const subscription = finalObs$.subscribe((value) => console.log(value));
```

### tap

A way to perform transparent actions such as logging. An example as below:

```js

import { of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

const obs$ = of(1, 2, 3, 4, 5);
obs$.pipe(
  tap(val => console.log(`BEFORE MAP: ${val}`)),
  map(val => val + 10),
  tap(val => console.log(`AFTER MAP: ${val}`))
).subscribe(val => console.log(val));
```

### map

a way to traverse observable's each value.

### pluck

a way to extract specific value from observable.

```js
import { from } from 'rxjs'; 
import { pluck } from 'rxjs/operators';

const data = [{id:1, value:'one'}, {id:2, value:'two'}, {id:3, value:'three'}];

const obsPluck$ = from(data).pipe(
  pluck('value')
).subscribe(x => console.log(x));

const obsMap$ = from(data).pipe(
  map(data => data.value)
).subscribe(x => console.log(x));
```

### debounceTime && distinctUntilChanged && throttleTime

A simple way to anti-shaking and throttling. 

```js

import { fromEvent } from 'rxjs'; 
import { pluck,map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

const input = document.querySelector('input');
const obs$ = fromEvent(input, 'input');
obs$.pipe(
map(event => event.target.value),
debounceTime(1000),
throttleTime(3000),
distinctUntilChanged())
.subscribe((value) => console.log(value));
```

### catchError

A way to handle errors.

```js
import { fromEvent, from, of } from 'rxjs'; 
import { catchError } from 'rxjs/operators';

const defaultRejectedPromise = () =>
  new Promise((resolve, reject) => 
  reject('defaultRejectedPromise!'));

const sourceObs$ = from(defaultRejectedPromise());
sourceObs$.pipe(catchError(error => of(`Bad Promise: ${error}`)))
.subscribe(next => console.log(next));
```

### combineLatest

A way to get latest value among multiple events

```js
import { timer, combineLatest } from 'rxjs';

//timerOne emits first value at 1s, then once every 4s
const timerOne$ = timer(1000, 4000);
//timerTwo emits first value at 2s, then once every 4s
const timerTwo$ = timer(2000, 4000);
//timerThree emits first value at 3s, then once every 4s
const timerThree$ = timer(3000, 4000);
//when one timer emits, emit the latest values from each timer as an array
combineLatest(timerOne$, timerTwo$, timerThree$).subscribe(
  (items) => {
    console.log(
    `Timer One Latest: ${items[0]},
     Timer Two Latest: ${items[1]},
     Timer Three Latest: ${items[2]}`
    );
  }
);
```

### zip

A way to wait for all observable to emit and then it zips those values into an array as an output.

```js
import { timer, zip } from 'rxjs';

//timerOne emits first value at 1s, then once every 4s
const timerOne$ = timer(1000, 4000);
//timerTwo emits first value at 2s, then once every 4s
const timerTwo$ = timer(2000, 4000);
//timerThree emits first value at 3s, then once every 4s
const timerThree$ = timer(3000, 4000);
//when one timer emits, emit the latest values from each timer as an array
zip(timerOne$, timerTwo$, timerThree$).subscribe(
  (items) => {
    console.log(
    `Timer One Latest: ${items[0]},
     Timer Two Latest: ${items[1]},
     Timer Three Latest: ${items[2]}`
    );
  }
);
```

## Hot vs Cold Observables



