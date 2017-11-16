'use strict';

function Sprite(fillColor, strokeColor = false, strokeWidth = 1) {
  this.fillColor = fillColor;
  this.strokeWidth  =strokeWidth;
  if(strokeColor) {
    this.strokeColor = strokeColor;
  }
}
