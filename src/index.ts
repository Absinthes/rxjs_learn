import { scan, timer } from "rxjs";

const createElem = (drop) => {
  const elem = document.createElement("div");
  elem.style.position = "absolute";
  elem.style.top = drop.y + "px";
  elem.style.left = drop.x + "px";
  elem.style.fontSize = "12px";
  elem.innerHTML = drop.d.reduce((acc, c) => (acc += "<br/>" + c), "");
  elem.style["color"] = `rgb(21, ${100 + drop.d.length * 10}, 21)`;
  return elem;
};

export const render = (matrix) => {
  document.body.innerHTML = "";
  const container = document.createElement("div");
  container.style.position = "relative";
  // container.style.overflow = "hidden";
  matrix.forEach((m) => container.appendChild(createElem(m)));
  document.body.appendChild(container);
};

type Drop = {
  x: number;
  y: number;
  d: string[];
  remove: boolean;
};

const createDrop = (x: number, y: number): Drop => ({
  x,
  y,
  d: [],
  remove: false,
});
const random = (max: number) => Math.random() * Math.random() * max;
const ranodmChar = () => String.fromCharCode(random(128));

const markForRemoval = (matrix: Drop[]) => {
  matrix.forEach((drop) => {
    drop.remove = drop.remove ? true : drop.d.length > 30;
  });
};

const updateDrops = (matrix: Drop[]) => {
  matrix.forEach((drop) => {
    drop.d = drop.remove
      ? drop.d.slice(1).map(() => ranodmChar())
      : [...drop.d, ranodmChar()];
  });
};

const updateMatrix = (matrix: Drop[]) => [
  ...matrix,
  createDrop(random(window.innerWidth), random(window.innerHeight)),
];

timer(0, 1000 / 60)
  .pipe(
    scan<number, Drop[]>((matrix) => {
      return markForRemoval(matrix), updateDrops(matrix), updateMatrix(matrix);
    }, [])
  )
  .subscribe(render);
