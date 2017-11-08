'use strict';

function GameObject(x, y, width, height, sprite = false) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.sprite = sprite ? sprite : undefined;
}

Entity.prototype.draw = function(context) {
  if (typeof this.sprite === "function") {
		this.draw(context, this.x, this.y, this.width, this.height);
	} else {
  	context.drawImage(this.sprite, this.x, this.y, this.width, this.height);
  }
};

module.exports = GameObject;
