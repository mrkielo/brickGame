import { detectCollision } from './collisionDetection.js'

export default class Ball {

	constructor(game) {

		this.image = document.getElementById('img_ball')

		this.gameWidth = game.gameWidth
		this.gameHeight = game.gameHeight
		
		this.size = 24
		this.game = game

		this.reset()
		
		

	
	}

	draw(ctx) {
		ctx.drawImage(this.image, this.position.x , this.position.y, this.size, this.size)
	}

	update(deltaTime) {

		this.position.x += this.speed.x
		this.position.y += this.speed.y 
		

		//collision with left and right side
		if(this.position.x<0 || this.position.x + this.size > this.gameWidth) {
			this.speed.x = -this.speed.x
		}
		
		//collisiion with top side
		if(this.position.y<0) {
			this.speed.y = -this.speed.y
		}

		//collision with bottom side
		//lives counting
		if(this.position.y + this.size > this.gameHeight){
			this.speed.y = -this.speed.y
			this.game.lives--
			this.reset()
		}




		if(detectCollision(this, this.game.paddle)) {
			this.speed.y = -this.speed.y 
			
		}
	}

	reset() {
		this.speed = { x: 4, y: -4 }
		this.position = {
			x: this.gameWidth / 2,
			y: this.gameHeight /2 }
	}



}
