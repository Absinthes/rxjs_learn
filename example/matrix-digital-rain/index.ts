// RxJS v6+
import { interval, timer } from "rxjs";
import { scan } from "rxjs/operators";
import { render } from "./html-renderer";
import { markForRemoval, updateDrops, updateMatrix } from "./matrix";

timer(0, 1000 / 60)
  .pipe(
    scan<number, any[]>((matrix) => {
      return markForRemoval(matrix), updateDrops(matrix), updateMatrix(matrix);
    }, [])
  )
  .subscribe(render);
