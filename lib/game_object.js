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
  if(this.sprite instanceof Sprite) {
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.fillStyle = this.sprite.fillColor;
    if(this.sprite.strokeColor) {
      context.strokeStyle = this.sprite.strokeColor;
      context.stroke()
    }
    context.fill();
    context.stroke();
  } else if(typeof this.sprite === "function") {
		this.draw(context, this.x, this.y, this.width, this.height);
  } else {
  	context.drawImage(this.sprite, this.x, this.y, this.width, this.height);
  }
};

GameObject.prototype.OnClick = function(event, obj, obj_name) {
  if(this.onClickListener && typeof this.onClickListener === "function") {
    this.onClickListener(event, obj, obj_name);
  }
}

GameObject.prototype.setOnClickListener = function(onClickListener) {
    this.onClickListener = onClickListener;
}
