import { from, map, pairwise, scan } from "rxjs";

const priceHistories = [100, 98, 96, 102, 99, 105, 105];

const source$ = from(priceHistories).pipe(
  pairwise(),
  map(([yesterdayPrice, todayPrice], idx) => ({
    day: idx + 2,
    todayPrice,
    priceUp: todayPrice > yesterdayPrice,
    priceDown: todayPrice < yesterdayPrice,
  })),
  scan(
    (acc, it) => ({
      ...it,
      priceBelow100Days: acc.priceBelow100Days + (it.todayPrice < 100 ? 1 : 0),
    }),
    {
      day: 1,
      todayPrice: 0,
      priceUp: false,
      priceDown: false,
      priceBelow100Days: 0,
    }
  )
);

source$.subscribe((it) => {
  console.log(it);
});
