const createElem = (drop) => {
  const elem = document.createElement("div");
  elem.style.position = "absolute";
  elem.style.marginTop = drop.x + "px";
  elem.style.marginLeft = drop.y + "px";
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
