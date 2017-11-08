"use strict";

/**
* Handles the render loop for the game. canvas : the canvas to draw on,
* initFunc: a callback to be called everytime the scene is started,
* simulationFunc: updates the state of the game simulation,
* drawFunc: a callback that draws the game
*/
function Scene(canvas, initFunc, simulationFunc, drawFunc) {
  this.canvas = canvas;
  this.initFunc = initFunc;
  this.simulationFunc = simulationFunc;
  this.drawFunc = drawFunc;

  this.context = canvas.getContext("2d");
  // The scene state, is running or not
  this.running = false;
  
}

module.exports = Scene;
