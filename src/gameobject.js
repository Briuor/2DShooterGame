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
