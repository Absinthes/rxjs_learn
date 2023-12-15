import { timer, fromEvent, merge, interval } from "rxjs";
import {
  switchMap,
  startWith,
  scan,
  takeWhile,
  takeUntil,
  filter,
  mapTo,
  map,
  tap,
  pluck,
} from "rxjs/operators";

let currentNumber = 0;

// elems
const input: any = document.getElementById("range");

// utility functions
const takeUntilFunc = (endRange, currentNumber) => {
  return endRange > currentNumber
    ? (val) => val <= endRange
    : (val) => val >= endRange;
};
const positiveOrNegative = (endRange, currentNumber) => {
  return endRange > currentNumber ? 1 : -1;
};
const updateHTML = (id) => (val) =>
  (document.getElementById(id).innerHTML = val);

// streams
const enter$ = fromEvent(input, "keyup").pipe(
  pluck("code"),
  filter((code) => code === "Enter")
);

enter$
  .pipe(
    map(() => parseInt(input.value)),
    switchMap((endRange) => {
      return timer(0, 20).pipe(
        mapTo(positiveOrNegative(endRange, currentNumber)),
        startWith(currentNumber),
        scan((acc, curr) => {
          console.log(acc, curr);
          return acc + curr;
        }),
        takeWhile(takeUntilFunc(endRange, currentNumber))
      );
    }),
    tap((v) => (currentNumber = v))
  )
  .subscribe(updateHTML("display"));
