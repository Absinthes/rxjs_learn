console.clear();
import { fromEvent, interval } from 'rxjs';
import { tap, scan, map, switchMap, takeWhile } from 'rxjs/operators';
import { dot, updatedDot, setTimerText, resetDotSize, moveDot } from './dom-updater';

interface State {
  score: number;
  intrvl: number;
}
const makeInterval = (val: State) => interval(val.intrvl).pipe(
  map(v => 5 - v),
  tap(setTimerText)
);
const gameState: State = { score: 0, intrvl: 500 };
const nextState = (acc: State) => ({
  score: acc.score += 1,
  intrvl: acc.score % 3 === 0 ? acc.intrvl -= 50 : acc.intrvl
});
const isNotGameOver = intervalValue => intervalValue >= 0;

const game$ = fromEvent(dot, 'mouseover')
  .pipe(
    tap(moveDot),
    scan<Event, State>(nextState, gameState),
    tap(state => updatedDot(state.score)),
    switchMap(makeInterval),
    tap(resetDotSize),
    takeWhile(isNotGameOver)
  );

game$.subscribe(
  n => { },
  e => { },
  () => setTimerText('ouch!')
);