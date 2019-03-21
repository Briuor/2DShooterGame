import GameObject from "./gameobject.js";

export default class Shoot extends GameObject {
	
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

