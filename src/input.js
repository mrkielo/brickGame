import Game from "./game.js";

export default class InputHandler {

	constructor(game) {

		this.game = game

		document.addEventListener('keydown', event => {
			switch(event.keyCode) {
				case 37:
					game.paddle.moveLeft()
				break;
	
				case 39:
					game.paddle.moveRight()
				break;

				case 27:
					if(game.gamestate!=3) //GAMESTATE.GAMEOVER = 3
					game.togglePause()
				break;
			}
		})
		
		document.addEventListener('keyup', event => {
			switch(event.keyCode) {
				case 37:
					if(game.paddle.speed < 0)	game.paddle.stop()
				break
	
				case 39:
					if(game.paddle.speed>0)	game.paddle.stop()
				break

				case 32:
					game.start()
				break
			}
		})

		game.canvas.addEventListener('onclick', event =>{
			
		})

		// game.canvas.addEventListener('onmouseup', event => {
		// 	this.clickPosition = undefined
		// })

		



	}
	mousePosition(event) {
		let rect = this.game.canvas.getBoundingClientRect()
		this.clickPosition = {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top	
		}	
	}

}