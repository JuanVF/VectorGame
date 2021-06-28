class DragonFly extends GameObject {
    constructor(ID){
        super(ID)
        this.tag = "DragonFly"
    }

    // This function will be executed first and once
    // This function can be async
    init(context){
        this.position.set(getRandom(0, context.width), getRandom(0, context.height), 0)
        this.color = [255, 255, 255, Math.random()]
        this.size = getRandom(1, 5)
        this.accelerationRate = getRandom(50, 100) * 100

        this.moveTo = new Vector(getRandom(0, context.width), getRandom(0, context.height), 0)
        this.selected = []
    }

    // This function will be executed every frame
    loop(context){  
        this.acceleration = Vector.substract(this.moveTo, this.position)

        if (this.acceleration.module() < 10) {
            this.speed = Vector.zero()

            this.moveTo = new Vector(getRandom(0, context.width), getRandom(0, context.height), 0)
        }

        let distance = this.acceleration.module() / this.accelerationRate

        this.acceleration = this.acceleration.normalize()
        this.acceleration = Vector.scalarMul(this.acceleration, distance)

        this.speed = Vector.sum(this.speed, this.acceleration)

        this.position = Vector.sum(this.position, this.speed)
        
        context.drawCircle(this.position, this.color, this.size)

        if (this.selected.length === 0){
            let dragonFlies = context.findByTag(this.tag)

            for (let i = 0; i < getRandom(1, 3); i++){
                this.selected.push(dragonFlies[Math.ceil(getRandom(0, dragonFlies.length - 1))])
            }
        }

        for (let i = 0; i < this.selected.length; i++)
            context.drawLine(this.position, this.selected[i].position, this.color)
    }
}