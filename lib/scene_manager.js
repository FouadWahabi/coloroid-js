"use strict";

/**
* Manage the scenes. Add, start, stop, switch
*/
function SceneManager() {
	this.scenes = {};
}

SceneManager.prototype.add = function(name, scene) {
	this.scenes[name] = scene;
};

SceneManager.prototype.get = function(name) {
	return this.scenes[name];
};

SceneManager.prototype.switchTo = function(name) {
	if (this.currentScene === this.scenes[name]) {
		this.currentScene.reset();
		return;
	}
	if (this.currentScene !== undefined) {
		this.currentScene.stop();
	}
	this.currentScene = this.scenes[name];
	this.currentScene.reset();
	this.currentScene.start();
};

module.exports = SceneManager;
