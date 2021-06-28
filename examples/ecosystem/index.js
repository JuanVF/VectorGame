const canvas = new Canvas('game-canvas', window.innerWidth * 0.9, window.innerHeight * 0.9)

canvas.setBackgroundColor(0, 0, 50, 1)

for (let i = 0; i < 70; i++){
    canvas.appendObject(new DragonFly(`DF-${i}`))
}

canvas.run()