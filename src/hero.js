class Hero extends GameObject{
	constructor(x, y, w, h) {
		super(x, y, w, h);
		this.angle = 0;
		this.speed = 2;
		this.shoot = [];
		this.fired = false;
	}

	fire() {
		let centerX = this.x + this.w/2;
		let centerY = this.y + this.h/2;
		let shoot = new Shoot(centerX, centerY, 5, 5, this.angle);
		this.shoot.push(shoot);
		this.fired = true;
	}

	updateAngle(mousePos) {
		let centerX = this.x + this.w/2;
		let centerY = this.y + this.h/2;

		this.angle = Math.atan2(mousePos.y - centerY, mousePos.x - centerX) + Math.PI/2;
	}

	move(keyPressed) {
		if(this.fired){
			for(let i = 0; i < this.shoot.length; i++) {
			    this.shoot[i].move();
			}
		}
		if(keyPressed[37] || keyPressed[65]) // left
			this.x -= this.speed;
		if(keyPressed[39] || keyPressed[68]) // right
			this.x += this.speed;
		if(keyPressed[40] || keyPressed[83]) // down
			this.y += this.speed;
		if(keyPressed[38] || keyPressed[87]) // top
			this.y -= this.speed;
	}

	draw(ctx) {
		ctx.save();
			//ROTATE
			ctx.translate(this.x + this.w/2, this.y + this.h/2);
			ctx.rotate(this.angle);
			ctx.translate(-(this.x + this.w/2) , -(this.y + this.h/2));
			//draw RECT
			ctx.fillStyle = "red";
			ctx.fillRect(this.x, this.y, this.w, this.h);
			//draw LINE
			ctx.beginPath();
			ctx.moveTo(this.x + this.w/2, this.y + this.h/2);
			ctx.lineTo(this.x + this.w/2, (this.y + this.h/2)-10);
			ctx.stroke();
		ctx.restore();
	}

	update(inputHandler) {
		this.updateAngle(inputHandler.getMousePos);
		this.move(inputHandler.getKeyPressed);
	}
}
