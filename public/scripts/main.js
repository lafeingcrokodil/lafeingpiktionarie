"use strict";

const defaultColor = "#000000";

let colorPicker, ctx;
let pos = { x: 0, y: 0 };
let lineWidth = 5;

window.addEventListener("load", init, false);

function init() {
  colorPicker = document.querySelector("#colorPicker");
  colorPicker.value = defaultColor;
  colorPicker.parentNode.style.backgroundColor = colorPicker.value;
  colorPicker.addEventListener("input", updateColor, false);
  colorPicker.select();

  let canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d");
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mousedown", setPosition);
  canvas.addEventListener("mouseenter", setPosition);
  canvas.addEventListener("wheel", adjustLineWidth, { passive: false });

  let clearBtn = document.querySelector(".clear");
  clearBtn.addEventListener("click", clear);
}

function clear() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function draw(e) {
  // mouse left button must be pressed
  if (e.buttons !== 1) return;

  ctx.beginPath();

  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.strokeStyle = colorPicker.value;

  ctx.moveTo(pos.x, pos.y);
  setPosition(e);
  ctx.lineTo(pos.x, pos.y);

  ctx.stroke();
  ctx.closePath();
}

function adjustLineWidth(e) {
  e.preventDefault();
  lineWidth -= e.deltaY * 0.01;
  lineWidth = Math.min(Math.max(1, lineWidth), 500);
}

function setPosition(e) {
  pos.x = e.clientX - ctx.canvas.getBoundingClientRect().left;
  pos.y = e.clientY - ctx.canvas.getBoundingClientRect().top;
}

function updateColor(event) {
  colorPicker.parentNode.style.backgroundColor = event.target.value;
}
