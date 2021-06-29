const canvas = new Canvas('game-canvas', window.innerWidth * 0.9, window.innerHeight * 0.9)

const balloon = new Balloon("balloon")
const wind = new Wind("balloon")

canvas.setBackgroundColor(255, 255, 255, 1)
canvas.appendObject(balloon)

canvas.run()