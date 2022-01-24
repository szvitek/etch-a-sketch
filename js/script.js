// dom elements
const container = document.querySelector('.container');
const colorPicker = document.querySelector('#color');
const slider = document.querySelector('#slider');
const sizeField = document.querySelector('#sizeField');
const resetBtn = document.querySelector('#reset');
const modeButtons = document.querySelectorAll('.mode-selector');

// variables
const defaultSize = 16;
let size = defaultSize;
let color = '#000';
let mode = 'color'; // | color | grayscale | rainbow

colorPicker.value = color;

// event listeners
resetBtn.addEventListener('click', onReset);
slider.addEventListener('input', updateSize);
colorPicker.addEventListener('input', colorSelectorChanged);

modeButtons.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    toggleActiveClass(event.target);
    mode = event.target.id;
    if (event.target.id === 'color-picker') {
      color = event.target.value;
    }
  });
});

// functions
function onReset() {
  createGrid();
}

function colorSelectorChanged(event) {
  color = event.target.value;
}

function toggleActiveClass(target) {
  modeButtons.forEach((btn) => {
    if (btn === target) {
      return btn.classList.add('active');
    }

    btn.classList.remove('active');
  });
}

function getRandomColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor}`;
}

function onHover(event) {
  const el = event.target;

  if (mode === 'color') {
    el.style.backgroundColor = color;
    el.style.opacity = 1;
  }

  if (mode === 'grayscale') {
    const color = el.style.backgroundColor;
    const opacity = parseFloat(el.style.opacity);

    if (color !== 'rgb(0, 0, 0)') {
      el.style.backgroundColor = 'rgb(0, 0, 0)';
      el.style.opacity = 0.1;
      return;
    }

    if (opacity < 1) {
      el.style.opacity = opacity + 0.1;
    }
  }

  if (mode === 'rainbow') {
    el.style.backgroundColor = getRandomColor();
    el.style.opacity = 1;
  }
}

function updateSize(event) {
  size = event.target.value;
  sizeField.textContent = size;
  createGrid();
}

function createGrid() {
  sizeField.textContent = size;
  container.setAttribute(
    'style',
    `grid-template-columns: repeat(${size}, 2fr); grid-template-rows: repeat(${size}, 2fr);`
  );

  container.innerHTML = ''; // remove all items hack
  for (let i = 0; i < Math.pow(size, 2); i++) {
    const div = document.createElement('div');
    div.classList.add('item');
    div.onmouseenter = onHover;
    div.style.width = `calc(600px / ${size})`;
    div.style.height = `calc(600px / ${size})`;
    container.appendChild(div);
  }
}

createGrid();
