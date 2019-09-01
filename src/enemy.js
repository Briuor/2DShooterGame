import GameObject from "./gameobject.js";

export default class Enemy extends GameObject {

    constructor() {
        super(
            Math.floor(Math.random() * window.innerWidth),  // x
            Math.floor(Math.random() * window.innerHeight), // y
            25,  // width 
            25); // height
            console.log(this)
        this.speed = 1;
        this.angle = 0;
		this.prevX = this.x;
		this.prevY = this.y;
    }

    updateAngle(heroX, heroY) {
        let centerX = this.x + this.w/2;
		let centerY = this.y + this.h/2;

        this.angle = Math.atan2(
            heroY - centerY, heroX - centerX) + Math.PI/2;
    }

    move(heroX, heroY) {
        this.prevX = this.x;
        this.prevY = this.y;
        // down
        if(heroY > this.y && (heroX <= this.x + 10 && heroX >= this.x - 10)) {
            console.log("down");
            this.y += this.speed; 
        } 
        // up
        else if(heroY < this.y && (heroX <= this.x + 10 && heroX >= this.x - 10)) {
            console.log("up");
            this.y -= this.speed; 
        }
        // left
        else if(heroX < this.x && (heroY <= this.y + 10 && heroY >= this.y - 10)) {
            console.log("left");
            this.x -= this.speed; 
        }
        // right
        else if(heroX > this.x && (heroY <= this.y + 10 && heroY >= this.y - 10)) {
            console.log("right");
            this.x += this.speed; 
        }
        // right up
        else if(heroY > this.y && heroX < this.x) {
            console.log("go to left down")
            this.y += this.speed; this.x -= this.speed;
        } 
        // right down
        else if(heroY > this.y && heroX > this.x) {
            console.log("go to right down")
            this.y += this.speed; this.x += this.speed;
        }
        // left up
        else if(heroY < this.y && heroX >= this.x) {
            console.log("go to right up")
            this.y -= this.speed; this.x += this.speed;
        } 
        // left down
        else if(heroY < this.y && heroX <= this.x) {
            console.log("go to left up")
            this.y -= this.speed; this.x -= this.speed;
        } 
        
    }

    update(heroX, heroY) {
        this.updateAngle(heroX, heroY);
        this.move(heroX, heroY);
    }

    draw(ctx) {
        ctx.save();
            //ROTATE
            ctx.translate(this.x + this.w/2, this.y + this.h/2);
            ctx.rotate(this.angle);
            ctx.translate(-(this.x + this.w/2) , -(this.y + this.h/2));
            //draw RECT
            ctx.fillStyle = "green";
            ctx.fillRect(this.x, this.y, this.w, this.h);
            //draw LINE
            ctx.beginPath();
            ctx.moveTo(this.x + this.w/2, this.y + this.h/2);
            ctx.lineTo(this.x + this.w/2, (this.y + this.h/2)-10);
            ctx.stroke();
        ctx.restore();
    }
}