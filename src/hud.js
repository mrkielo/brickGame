export default class Hud {

	constructor(game) {
		this.game = game
	}

	drawPause(ctx) {
		ctx.rect(0,0,this.game.gameWidth, this.game.gameHeight)
		ctx.fillStyle = "rgba(0,0,0,0.7)"
		ctx.fill()
		ctx.font = "30px Arial"
		ctx.fillStyle = "white"
		ctx.textAlign = "center"
		ctx.fillText("Paused", this.game.gameWidth/2, this.game.gameHeight/2)
	}

}