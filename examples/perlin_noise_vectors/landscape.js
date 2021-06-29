class Landscape extends GameObject {
    constructor(ID){
        super(ID)
    }

    init(context){
        this.position.set(500, 250, 0)
        this.dimensions = context.dimensions
        this.delay = 0

        this.time = new Date().getTime()

        noise.seed(Math.random())
        
        this.counter = 0
        this.zoomRate = 0

        context.triggerBG()
    }

    loop(context){
        if (this.time + this.delay < new Date().getTime()){
            context.drawBackground()
            let rate = 1
            let color = new Color(213, 246, 255, 1)

            for (let x = 1; x < this.dimensions.x; x += rate){
                for (let y = 1; y < this.dimensions.y; y += rate){
                    let position = new Vector(x, y)
                    let direction = new Vector(0, -1)
                    let scalar = noise.simplex3(x / this.zoomRate, y / this.zoomRate, this.counter)

                    direction = Vector.scalarMul(direction, 1 * scalar)
                    direction = Vector.sum(direction, position)
                    
                    context.drawLine(position, direction, color)
                }   
            }

            this.counter += 0.07

            this.zoomRate = Math.sin(this.counter) + 40

            this.time = new Date().getTime()
        }
    }
}