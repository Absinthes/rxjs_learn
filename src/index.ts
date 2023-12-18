import {
  fromEvent,
  interval,
  map,
  repeat,
  scan,
  switchMap,
  takeWhile,
  tap,
} from "rxjs";
import {
  dot,
  moveDot,
  resetDotSize,
  setTimerText,
  updatedDot,
} from "./dom-updater";

interface State {
  score: number;
  intrvl: number;
}

const state: State = { score: 0, intrvl: 500 };

const nextState = (acc: State) => ({
  score: acc.score + 1,
  intrvl: acc.intrvl,
});

const interval$ = (state) =>
  interval(state.intrvl).pipe(
    map((v) => 5 - v),
    tap(setTimerText)
  );

const game$ = fromEvent(dot, "mouseover").pipe(
  tap(moveDot),
  scan(nextState, state),
  tap((state) => updatedDot(state.score)),
  switchMap(interval$),
  tap(resetDotSize),
  takeWhile((inteval) => inteval >= 0)
);

game$.subscribe();
