'use strict';

function Sprite(fillColor, strokeColor = false) {
  this.fillColor = fillColor;
  if(strokeColor) {
    this.strokeColor = strokeColor;
  }
}
