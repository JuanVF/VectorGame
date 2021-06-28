class Ball extends GameObject {
    constructor(ID){
        super(ID)
    }

    // This function will be executed first and once
    // This function can be async
    init(context){
        this.speed.set(1, 3.3, 0)
        this.position.set(90, 90, 0)
    }

    // This function will be executed every frame
    loop(context){
        const opacity = 1
        const black = [0, 0, 0, opacity]
        const blue = [0, 0, 255, opacity]

        const refPos = context.mousePosition

        let vecPR = Vector.substract(refPos, this.position).normalize()
        vecPR = Vector.scalarMul(vecPR, 5)

        this.position = Vector.sum(this.position, vecPR)

        context.drawCircle(this.position, black, 10)
        context.drawCircle(refPos, black, 10)

        context.drawLine(this.position, context.mousePosition, blue)
    }
}