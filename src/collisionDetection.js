export default class Collisions {

	constructor(game) {
		this.game = game
	}

	ballX(ball,object) {
		let ballSides = {
			left: ball.position.x,
			right: ball.position.x + ball.size,
			top: ball.position.y,
			bottom: ball.position.y + ball.size
		}

		let ballCenter = {
			x: ball.position.x + ball.size / 2,
			y: ball.position.y + ball.size / 2
		}

		let objectSides = {
			left: object.position.x,
			right: object.position.x + object.width,
			top: object.position.y,
			bottom: object.position.y + object.height
		}

		if
			(
				ballCenter.y > objectSides.top && 
				ballCenter.y < objectSides.botttom && 
				ballSides.left <= objectSides.right &&
				ballSides.right >= objectSides.left  
			)
			return true
		else
			return false
	}

	ballY(ball, object) {

		let ballSides = {
			left: ball.position.x,
			right: ball.position.x + ball.size,
			top: ball.position.y,
			bottom: ball.position.y + ball.size
		}

		let ballCenter = {
			x: ball.position.x + ball.size / 2,
			y: ball.position.y + ball.size / 2
		}

		let objectSides = {
			left: object.position.x,
			right: object.position.x + object.width,
			top: object.position.y,
			bottom: object.position.y + object.height
		}
		if
			(
				ballCenter.x > objectSides.left && 
				ballCenter.x < objectSides.right && 
				ballSides.top <= objectSides.bottom &&
				ballSides.bottom >= objectSides.top  
			)
				return true
			else
				return false
	}
}