const random = () => Math.random() * 300;
const elem = id => document.getElementById(id);
const setElementText = (elem, text) =>
  elem.innerText = text.toString();
const timer = elem('timer');
const setDotSize = size => {
  dot.style.height = `${size}px`;
  dot.style.width = `${size}px`;
}

export const dot = elem('dot')!;
export const updatedDot = score => {
  if (score % 3 === 0) {
    dot.style.backgroundColor =
      '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
  }
  setElementText(dot, score);
}
export const setTimerText = text => setElementText(timer, text);
export const moveDot = () => {
  setDotSize(5);
  dot.style.transform = `translate(${random()}px, ${random()}px)`;
}
export const resetDotSize = () => setDotSize(30);