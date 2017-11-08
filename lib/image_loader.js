"use strict";

/**
 * A basic image load to load images into memory and call callback to let you know when image is loaded
 */
function ImageLoader() {

	this.images = {};
	this.totalImages = 0;
	this.loadedImages = 0;
	this.names = [];
}

ImageLoader.prototype.load = function(name, path) {
	// only load an image once
	if (this.names.indexOf(name) > -1) {
		return;
	}
	this.names.push(name);

	this.totalImages++;

	var img = new Image();
	var self = this;
	img.addEventListener("load", function() {
		self.loadedImages++;
		self.images[name] = img;
	});
	img.addEventListener("error", function() {
		console.error("Error in loading the image " + name);
	});
	img.src = path;
};

ImageLoader.prototype.allLoaded = function() {
	return this.totalImages === this.loadedImages;
};

ImageLoader.prototype.get = function(name) {
	var img = this.images[name];
	if (img === undefined) {
		console.error("Sorry image not found: " + name);
	}
	return img;
};
