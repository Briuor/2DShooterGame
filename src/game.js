import Hero from './hero.js';
import Enemy from './enemy.js';
import InputHandler from "./inputhandler.js";

export default class Game {

	constructor() {
		this.canvas = document.getElementById("canvas");
		this.canvas.width  = window.innerWidth;
  		this.canvas.height = window.innerHeight;

		this.ctx = this.canvas.getContext("2d");
		this.hero = new Hero(this.canvas.width/2, this.canvas.height/2, 25 , 25 );
		this.enemy = new Enemy(window.innerWidth - 100, window.innerHeight - 100, 25 , 25 );
    	this.inputHandler = new InputHandler();
	}

	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.enemy.draw(this.ctx);
		this.hero.draw(this.ctx);
		//draw shoot
		if(this.hero.fired) {
			for(let i = 0; i < this.hero.shoot.length; i++) {
				this.ctx.fillRect(this.hero.shoot[i].getX, this.hero.shoot[i].getY, this.hero.shoot[i].getW, this.hero.shoot[i].getH);
			}
		}
	}

	update = () => {
		//Se atirou
		if(this.inputHandler.getFired) {
			this.hero.fire();
			this.inputHandler.setFired = false;
		}
		this.hero.update(this.inputHandler);
		this.enemy.update(this.hero.x, this.hero.y);
		this.draw();
	}

	start() {
		setInterval( this.update, 10 );
	}
}
