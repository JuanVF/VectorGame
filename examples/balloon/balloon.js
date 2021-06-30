class Balloon extends GameObject{
    constructor(ID){
        super(ID)
    }

    init(context){
        this.dimensions = new Vector(context.width, context.height, 0)
        this.position.set(500, 250, 0)

        this.size = 40
        this.lineSize = 100
        this.zoomRate = 500
        this.mass = 2
        this.counter = 0

        noise.seed(Math.random())
    }   

    loop(context){
        let direction = new Vector(getRandom(-1, 1), getRandom(-1, 1))
        let scalar = noise.simplex3(
            this.position.x / this.zoomRate, 
            this.position.y / this.zoomRate, 
            this.counter)

        direction = Vector.scalarMul(direction, scalar)

        for (let i = 0; i < this.lineSize; i++){
            let randomizer = 5 * noise.simplex3(
                this.position.x / this.zoomRate, 
                (this.position.y + i) /100, 
                this.counter)

            let result = new Vector(
                this.position.x + randomizer, 
                this.position.y + this.size / 2 + i + randomizer+ 2 * direction.y)
            let color = Color.black()
            color.a = (this.lineSize - i) / this.lineSize
            context.drawPixel(result, color)
        }

        context.drawCircle(this.position, Color.red(), this.size)

        this.counter += 0.0005

        this.applyForce(direction)
        this.applyWallForce(this.dimensions)
        this.update()
        this.castPosition(this.dimensions)
    }
}