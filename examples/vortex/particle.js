class Particle extends GameObject {
    constructor(ID, initPos){
        super(ID)

        if (initPos) this.position = initPos
        this.acc = 1
    }

    init(context){
        this.size = getRandom(0.5, 4)
        this.color = getRandomColor()
        this.color.a = 1

        // You can change the lifetime of a particle here
        this.initLife = new Date().getTime()
        this.lifeTime = 2 * 1000

        this.time = new Date().getTime()
        this.delay = 500 * (1 + this.angle)

        this.direction = Vector.scalarMul(this.position.normalize(), Math.random()*(5-1.9)+1.9)
        this.dimensions = new Vector(
                context.dimensions.x - context.offset.x,
                context.dimensions.y - context.offset.y)
    }

    loop(context){
        this.position = Vector.sum(this.position, this.direction)

        // If the particle is out of the window we delete it
        if (this.isOut(context.dimensions, context.offset)){
            context.destroy(this.ID)
        }

        // If it reaches its lifetime its deleted too
        if (this.initLife + this.lifeTime < new Date().getTime()){
            context.destroy(this.ID)
        }

        // The color changes based on the distance of particle to the center
        this.color.a = this.position.module() / this.dimensions.module()
        this.direction = Vector.scalarMul(this.direction, this.acc)
        context.drawCircle(this.position, this.color, this.size)
    }

    // Returns true if the particle is out of the window
    isOut(dimensions, offset){
        let min = new Vector(-offset.x, -offset.y)
        let max = new Vector(dimensions.x - offset.x, dimensions.y - offset.y)

        if (min.x > this.position.x || this.position.x > max.x){
            return true
        }

        if (min.y > this.position.y || this.position.y > max.y){
            return true
        }

        return false
    }
}