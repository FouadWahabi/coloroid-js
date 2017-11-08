"use strict";

/**
* Handles the render loop for the game. canvas : the canvas to draw on,
* initFunc: a callback to be called everytime the scene is started,
* drawFunc: a callback that draws the game
*/
function Scene(canvas, initFunc, drawFunc) {
  this.canvas = canvas;
  this.initFunc = initFunc;
  this.drawFunc = drawFunc;
  this.frameTimestamp = -1;

  this.context = canvas.getContext("2d");
  // The scene state, is running or not
  this.running = false;

}

Scene.prototype.start = function() {
	this.frameTimestamp = -1;
	this.running = true;
	var scene = this;
  console.log("Scene started")
	this.requestId = window.requestAnimationFrame(function(t) { mainLoop(scene, t); });
};

Scene.prototype.stop = function() {
	this.running = false;
};

Scene.prototype.reset = function() {
	this.initFunc.call(this);
};

function mainLoop(scene, timestamp) {
	if (!scene.running) {
		return;
	}
	if (scene.frameTimestamp === -1) {
		scene.frameTimestamp = timestamp;
	}
	scene.frameTimestamp = timestamp;

	scene.context.save();
	scene.drawFunc.call(scene, scene.context);
	if (scene.running) {
    console.log(scene.drawFunc.toSource())
		scene.requestId = window.requestAnimationFrame(function(t) { mainLoop(scene, t); });
	} else {
    window.cancelAnimationFrame(scene.requestId);
  }
}
