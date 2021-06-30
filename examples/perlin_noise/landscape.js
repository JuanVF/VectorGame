class Landscape extends GameObject {
    constructor(ID){
        super(ID)
    }

    init(context){
        this.position.set(500, 250, 0)
        this.dimensions = context.dimensions
        this.delay = 10

        this.time = new Date().getTime()

        noise.seed(Math.random())
        
        this.counter = 0
        this.zoomRate = 0

        context.triggerBG()
    }

    loop(context){
        if (this.time + this.delay < new Date().getTime()){
            context.drawBackground()
            let rate = 10

            for (let x = 1; x < this.dimensions.x; x += rate){
                for (let y = 1; y < this.dimensions.y; y += rate){
                    let position = new Vector(x, y)
                    let scalar = noise.simplex3(x / this.zoomRate, y / this.zoomRate, this.counter)
                    let direction = new Vector(scalar + 1, scalar)
                    let color = getRandomColorP(x/ this.zoomRate, y/ this.zoomRate, this.counter)
                
                    direction = Vector.scalarMul(direction, rate * scalar)
                    direction = Vector.sum(direction, position)
                    direction.set(Math.floor(direction.x), Math.floor(direction.y), 0)
                    
                    context.drawLine(position, direction, color)
                }   
            }

            this.counter += 0.05

            this.zoomRate = Math.sin(this.counter) + 700

            this.time = new Date().getTime()
        }
    }
}