
//imports
import Game from './src/game.js'

//consts
const GAME_WIDTH = 800
const GAME_HEIGHT = 600


//new objects
let canvas = document.getElementById('gameScreen')
let ctx = canvas.getContext('2d')
let game = new Game(GAME_WIDTH, GAME_HEIGHT)


// starting
let lastTime
let deltaTime = Date.now()
requestAnimationFrame(gameLoop)

//gameloop
function gameLoop (timeStamp) {
	
	ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT)

	game.update()
	game.draw(ctx)
	let lastTime = Date.now()
	requestAnimationFrame(gameLoop)
}