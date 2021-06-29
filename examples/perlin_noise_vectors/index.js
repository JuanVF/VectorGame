const canvas = new Canvas('game-canvas', window.innerWidth * 0.12, window.innerHeight * 0.152)

const landscape = new Landscape('L')
canvas.setBackgroundColor(52, 189, 216, 1)

canvas.appendObject(landscape)

canvas.run()