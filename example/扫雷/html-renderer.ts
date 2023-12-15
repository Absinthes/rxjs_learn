export const renderMinefield = arr =>
  arr.forEach((r, ri) =>
    (elem =>
      r.forEach((c, ci) =>
        (col => (
          col.innerText = '_',
          col.id = `${ri}${ci}`,
          elem.appendChild(document.createTextNode('\u00A0\u00A0')),
          elem.appendChild(col))
        )(document.createElement('span')),
        document.body.appendChild(elem)))
      (document.createElement('div')));

export const renderScore = val =>
  (scoreElem => scoreElem.innerText = parseInt(scoreElem.innerText) + val)(document.getElementById('score'));

export const renderGameOver = () => document.body.innerHTML += '<br/>GAME OVER';

const addElem = decorator => (elem => (
  decorator(elem),
  document.body.appendChild(elem))
)(document.createElement('span'));

addElem(elem => elem.innerText = 'Score: ');
addElem(elem => (elem.id = 'score', elem.innerText = '0'));