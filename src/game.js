import Paddle from './paddle.js'
import InputHandler from './input.js'
import Ball from './ball.js'
import Brick from './brick.js'
import {buildLevel, level1,level2} from './levels.js'
import Collisions from './collisionDetection.js'

const GAMESTATE = {
	PAUSED: 0,
	RUNNING: 1,
	MENU: 2,
	GAMEOVER: 3,
	NEWLEVEL: 4
}


export default class Game {

	constructor(gameWidth, gameHeight) {

		this.gameHeight = gameHeight
		this.gameWidth = gameWidth

		this.gamestate = GAMESTATE.MENU
		this.ball = new Ball(this)
		this.paddle = new Paddle(this)
		this.collisions = new Collisions(this)
		new InputHandler(this.paddle, this)

		this.lives = 3
		this.bricks = []
		this.gameObjects = []

		this.levels = [level1, level2]
		this.currentLevel = 0

	}

	start() {
		
		if(this.gamestate != GAMESTATE.MENU && this.gamestate != GAMESTATE.NEWLEVEL) return
		this.ball.reset()
		this.bricks = buildLevel(this, this.levels[this.currentLevel])

		this.gameObjects = [this.ball, this.paddle]

		this.gamestate = GAMESTATE.RUNNING
	}

	update(deltaTime) {

		if(
			this.gamestate == GAMESTATE.PAUSED ||
			this.gamestate == GAMESTATE.MENU ||
			this.gamestate == GAMESTATE.GAMEOVER
			) 
				return

			
		if(this.lives == 0)  this.gamestate = GAMESTATE.GAMEOVER


		this.gameObjects.forEach((object) => object.update(deltaTime))
		this.bricks.forEach((brick) => brick.update(deltaTime))
		this.bricks = this.bricks.filter(brick => !brick .markedForDeletion)

		if(this.bricks.length === 0) {
			this.currentLevel++
			this.gamestate = GAMESTATE.NEWLEVEL
			this.start()
		}
	}

	draw(ctx) {
		this.gameObjects.forEach((object) => object.draw(ctx))
		this.bricks.forEach((brick) => brick.draw(ctx))
		
		
		//drawing pause menu
		if(this.gamestate == GAMESTATE.PAUSED) {
			ctx.rect(0,0,this.gameWidth,this.gameHeight)
			ctx.fillStyle = "rgba(0,0,0,0.7)"
			ctx.fill()
			ctx.font = " 30px Arial"
			ctx.fillStyle = "white"
			ctx.textAlign = "center"
			ctx.fillText("Paused", this.gameWidth/2, this.gameHeight/2)
		}

		//drawing menu
		if(this.gamestate == GAMESTATE.MENU) {
			ctx.rect(0,0,this.gameWidth,this.gameHeight)
			ctx.fillStyle = "rgba(0,0,0,1)"
			ctx.fill()
			ctx.font = " 30px Arial"
			ctx.fillStyle = "white"
			ctx.textAlign = "center"
			ctx.fillText("Press SPACEBAR to Start", this.gameWidth/2, this.gameHeight/2)
		}
		//drawing gameover
		if(this.gamestate == GAMESTATE.GAMEOVER) {
			ctx.rect(0,0,this.gameWidth,this.gameHeight)
			ctx.fillStyle = "rgba(0,0,0,1)"
			ctx.fill()
			ctx.font = " 30px Arial"
			ctx.fillStyle = "white"
			ctx.textAlign = "center"
			ctx.fillText("GAMEOVER", this.gameWidth/2, this.gameHeight/2)
		}
		
		

	}

	togglePause() {
		if(this.gamestate == GAMESTATE.PAUSED) {
			this.gamestate = GAMESTATE.RUNNING
		}	
		else {
			this.gamestate = GAMESTATE.PAUSED
		}
	}
}