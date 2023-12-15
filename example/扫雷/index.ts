console.clear();
import { fromEvent, of } from 'rxjs';
import { map, tap, filter, pluck, switchMap, takeWhile, finalize } from 'rxjs/operators';
import { renderMinefield, renderScore, renderGameOver } from './html-renderer';
import { size, mine } from './constants';
import { addMines, addMarks } from './mines';

const mines$ = of(Array(size).fill(0).map(e => Array(size).fill(0)))
  .pipe(
    map(addMines),
    map(addMarks),
    tap(renderMinefield)
  );

const click$ = mines => fromEvent(document, 'click')
  .pipe(
    map(({ clientX, clientY }: MouseEvent) =>
      document.elementFromPoint(clientX, clientY)),
    filter(elem => elem.id !== ''),
    tap(elem => (val => (
      renderScore(val === mine || elem.innerHTML !== '_' ? 0 : val),
      elem.innerHTML = val)
    )(mines[elem.id[0]][elem.id[1]])),
    pluck('id'),
    takeWhile(([x, y]) => mines[x][y] !== mine),
    finalize(renderGameOver)
  );

mines$.pipe(switchMap(click$)).subscribe();
