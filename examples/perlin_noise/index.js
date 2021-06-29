const canvas = new Canvas('game-canvas', window.innerWidth * 0.2, window.innerHeight * 0.6)

const landscape = new Landscape('L')

canvas.appendObject(landscape)

canvas.run()