class GameObject {
	constructor(x, y, w, h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	get getX() { return this.x; }
	get getY() { return this.y; }
	get getW() { return this.w; }
	get getH() { return this.h; }
}

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
}

class Shoot extends GameObject{
	constructor(x, y, w, h, angle) {
		super(x, y, w, h);
		this.speed = 5;
		this.angle = angle;
	}

	move() {
		this.x += Math.cos(this.angle - Math.PI/2) * this.speed;
		this.y += Math.sin(this.angle - Math.PI/2) * this.speed;
	}
}

class InputHandler {
	constructor() {
		//Keyboard Events
		this.keyPressed = {};
		window.addEventListener("keydown", (e) => {
			this.keyPressed[e.keyCode || e.which] = true;
		});

		window.addEventListener("keyup", (e) => {
			this.keyPressed[e.keyCode || e.which] = false;
		});
		//Mouse Events
		this.mousePos = { x: null, y: null};
		window.addEventListener("mousemove", (e) => {
			this.mousePos.x = e.clientX
			this.mousePos.y = e.clientY;
		});

		this.fired = false;
		window.addEventListener("click", (e) => {
			this.fired = true;
		});
	}

	get getKeyPressed() { return this.keyPressed; }
	get getMousePos() { return this.mousePos; }
	get getFired() { return this.fired; }
	set setFired(fired) { this.fired = fired; }
}

class Game {
	constructor() {
		this.canvas = document.getElementById("canvas");
		this.canvas.width  = window.innerWidth;
  		this.canvas.height = window.innerHeight;

		this.ctx = this.canvas.getContext("2d");
		this.rect = new Hero(this.canvas.width/2, this.canvas.height/2, 25 , 25 );
    	this.inputHandler = new InputHandler();
    	this.update = this.update.bind(this);
	}

	draw() {
		this.ctx.save();
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			//ROTATE
			this.ctx.translate(this.rect.getX + this.rect.getW/2,
							   this.rect.getY + this.rect.getH/2);
			this.ctx.rotate(this.rect.angle);
			this.ctx.translate(-(this.rect.getX + this.rect.getW/2) ,
							   -(this.rect.getY + this.rect.getH/2));
			//draw RECT
			this.ctx.fillStyle = "red";
			this.ctx.fillRect(this.rect.getX, this.rect.getY, this.rect.getW, this.rect.getH);
			//draw LINE
			this.ctx.beginPath();
			this.ctx.moveTo(this.rect.getX + this.rect.getW/2, 
				this.rect.getY + this.rect.getH/2);
			this.ctx.lineTo(this.rect.getX + this.rect.getW/2, 
				(this.rect.getY + this.rect.getH/2)-10);
			this.ctx.stroke();
		this.ctx.restore();
			//draw shoot
			if(this.rect.fired){
				for(let i = 0; i < this.rect.shoot.length; i++)
				this.ctx.fillRect(this.rect.shoot[i].getX, this.rect.shoot[i].getY, this.rect.shoot[i].getW, this.rect.shoot[i].getH);
			}
	}

	update() {
		if(this.inputHandler.getFired) {
			console.log("Atirou");
			this.rect.fire();
			this.inputHandler.setFired = false;
		}
		this.rect.updateAngle(this.inputHandler.getMousePos);
		this.rect.move(this.inputHandler.getKeyPressed);
		this.draw();
	}

	start() {
		setInterval( this.update, 10 );
	}
}

let game = new Game();
game.start();