const canvas = new Canvas('game-canvas', window.innerWidth * 0.9, window.innerHeight * 0.9)

canvas.setCenter(new Vector(canvas.width / 2.0, canvas.height / 2.0))
canvas.setBackgroundColor(0, 0, 50, 1)

const controller = new Controller("controller")

canvas.appendObject(controller)

canvas.run()