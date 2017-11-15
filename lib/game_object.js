'use strict';

function GameObject(x, y, width, height, sprite = false) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.sprite = sprite ? sprite : undefined;
  this.onClickListener = undefined;
}

GameObject.prototype.draw = function(context) {
  if (typeof this.sprite === "function") {
		this.draw(context, this.x, this.y, this.width, this.height);
	} else {
  	context.drawImage(this.sprite, this.x, this.y, this.width, this.height);
  }
};

GameObject.prototype.OnClick = function(event) {
  if(this.onClickListener && typeof this.onClickListener === "function") {
    this.onClickListener(event);
  }
}

GameObject.prototype.setOnClickListener = function(onClickListener) {
    this.onClickListener = onClickListener;
}
