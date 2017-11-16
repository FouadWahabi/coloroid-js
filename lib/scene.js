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
  this.gameObjects = {};

  this.context = canvas.getContext("2d");
  // The scene state, is running or not
  this.running = false;
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

Scene.prototype.start = function() {
	this.frameTimestamp = -1;
	this.running = true;
	var scene = this;
  console.log("Scene started")
	this.requestId = window.requestAnimationFrame(function(t) { mainLoop(scene, t); });
  this.onClickListener = function(event) {
    var mousePos = getMousePos(canvas, event);
    Object.keys(scene.gameObjects).forEach(function(obj_name) {
      var obj = scene.gameObjects[obj_name]
      if(mousePos.x >= obj.x && mousePos.x <= obj.x + obj.width && mousePos.y >= obj.y && mousePos.y <= obj.y + obj.height) {
        obj.OnClick(event, obj, obj_name);
      }
    })
  }
  canvas.addEventListener("click", this.onClickListener)
};

Scene.prototype.stop = function() {
	this.running = false;
  this.canvas.removeEventListener("click", this.onClickListener);
};

Scene.prototype.reset = function() {
	this.initFunc.call(this);
};

Scene.prototype.addGameObject = function(name, obj) {
  if(Object.keys(this.gameObjects).indexOf(name) > -1) {
    return;
  }
  this.gameObjects[name] = obj;
  obj.draw(this.context);
}

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
		scene.requestId = window.requestAnimationFrame(function(t) { mainLoop(scene, t); });
	} else {
    window.cancelAnimationFrame(scene.requestId);
  }
}
