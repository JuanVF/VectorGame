const canvas = new Canvas('game-canvas', window.innerWidth * 0.9, window.innerHeight * 0.9, false)

const landscape = new Landscape('L')
canvas.setBackgroundColor(255, 255, 255, 1)
canvas.setBackgroundColor(0, 0, 50, 1)

canvas.appendObject(landscape)

canvas.run()