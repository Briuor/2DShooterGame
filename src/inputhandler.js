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
		window.addEventListener("mousedown", (e) => {
			this.fired = true;
		});
	}

	get getKeyPressed() { return this.keyPressed; }
	get getMousePos() { return this.mousePos; }
	get getFired() { return this.fired; }
	set setFired(fired) { this.fired = fired; }
}
