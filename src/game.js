import Hero from './hero.js';
import Enemy from './enemy.js';
import InputHandler from "./inputhandler.js";
import CollisionHandler from './collisionhandler.js';

export default class Game {
	
	constructor() {
		this.canvas = document.getElementById("canvas");
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;

		this.ctx = this.canvas.getContext("2d");
		this.hero = new Hero(this.canvas.width / 2, this.canvas.height / 2, 25, 25);
		this.enemies = [];
		this.enemies[0] = new Enemy();

		this.currentTime = Date.now();
		this.timeToRespawn = Date.now() + 1000; // in milliseconds (each 1000 milliseconds spawn a new enemies[])

		this.inputHandler = new InputHandler();
		this.collisionHandler = new CollisionHandler();
	}

	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for(let i = 0; i < this.enemies.length; i++)
			this.enemies[i].draw(this.ctx);
		this.hero.draw(this.ctx);
		//draw shoot
		if (this.hero.fired) {
			for (let i = 0; i < this.hero.shoot.length; i++) {
				this.ctx.fillRect(this.hero.shoot[i].getX, this.hero.shoot[i].getY, this.hero.shoot[i].getW, this.hero.shoot[i].getH);
			}
		}
	}

	update = () => {
		// spawn a new enemy
		this.currentTime = Date.now();
		if (this.currentTime > this.timeToRespawn) {
			let enemy = new Enemy();
			this.enemies.push(enemy);
			this.timeToRespawn = this.currentTime + 1000;
		}
		//Se atirou
		if (this.inputHandler.getFired) {
			this.hero.fire();
			this.inputHandler.setFired = false;
		}
		// hero and enemies[] collision
		for(let i = 0; i < this.enemies.length; i++)
		{
			if(this.collisionHandler.doPolygonsIntersect(
				[{ x: this.hero.x, y: this.hero.y },
				{ x: this.hero.x + this.hero.w, y: this.hero.y },
				{ x: this.hero.x + this.hero.w, y: this.hero.y + this.hero.h },
				{ x: this.hero.x, y: this.hero.y + this.hero.h }],

				[{ x: this.enemies[i].x, y: this.enemies[i].y },
				{ x: this.enemies[i].x + this.enemies[i].w, y: this.enemies[i].y },
				{ x: this.enemies[i].x + this.enemies[i].w, y: this.enemies[i].y + this.enemies[i].h },
				{ x: this.enemies[i].x, y: this.enemies[i].y + this.enemies[i].h }],
			)) 
			{
				this.enemies[i].x = this.enemies[i].prevX;
				this.enemies[i].y = this.enemies[i].prevY;
			}
		}
		// shoot and enemies[] collision
		for(let i = 0; i < this.hero.shoot.length; i++) {
			for(let j = 0; j < this.enemies.length; j++)
			{
				if(this.collisionHandler.doPolygonsIntersect(
					[{ x: this.hero.shoot[i].x, y: this.hero.shoot[i].y },
					{ x: this.hero.shoot[i].x + this.hero.shoot[i].w, y: this.hero.shoot[i].y },
					{ x: this.hero.shoot[i].x + this.hero.shoot[i].w, y: this.hero.shoot[i].y + this.hero.shoot[i].h },
					{ x: this.hero.shoot[i].x, y: this.hero.shoot[i].y + this.hero.shoot[i].h }],
		
					[{ x: this.enemies[j].x, y: this.enemies[j].y },
					{ x: this.enemies[j].x + this.enemies[j].w, y: this.enemies[j].y },
					{ x: this.enemies[j].x + this.enemies[j].w, y: this.enemies[j].y + this.enemies[j].h },
					{ x: this.enemies[j].x, y: this.enemies[j].y + this.enemies[j].h }],
				))
				{
					this.enemies.splice(j, 1);
					this.hero.shoot.splice(i, 1);
				}
			}
		}
		this.hero.update(this.inputHandler);
		for(let i = 0; i < this.enemies.length; i++)
			this.enemies[i].update(this.hero.x, this.hero.y);
		this.draw();
	}

	start() {
		setInterval(this.update, 10);
	}
}
