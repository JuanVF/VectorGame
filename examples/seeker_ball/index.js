const canvas = new Canvas('game-canvas', window.innerWidth * 0.9, window.innerHeight * 0.9)

const ball = new Ball("ball")

canvas.appendObject(ball)

canvas.run()