const newButtons = new Array(9);

const row1 = document.querySelector('.row-1');
const row2 = document.querySelector('.row-2');
const row3 = document.querySelector('.row-3');

for (let i=1; i<10; i++) {
    newButtons[i] = document.createElement('button');
    newButtons[i].id = `button-${i}`;
    newButtons[i].textContent = `${i}`;
    newButtons[i].classList.add('number-button');
    if (i<4)
        row3.appendChild(newButtons[i]);
    else if (i <7)
        row2.appendChild(newButtons[i]);
    else 
        row1.appendChild(newButtons[i]);
}