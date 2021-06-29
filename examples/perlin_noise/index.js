const canvas = new Canvas('game-canvas', 900, 300)

const landscape = new Landscape('L')

canvas.appendObject(landscape)

canvas.run()