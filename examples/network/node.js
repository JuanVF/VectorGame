class Node extends GameObject {
    constructor(ID){
        super(ID)
        this.tag = "Node"
    }

    // This function will be executed first and once
    // This function can be async
    init(context){
        this.position.set(getRandom(0, context.width), getRandom(0, context.height), 0)
        this.color = getRandomColor()
        this.size = getRandom(0, 5)
        this.accelerationRate = getRandom(400, 3000) * 100

        this.moveTo = new Vector(getRandom(0, context.width), getRandom(0, context.height), 0)
        this.selected = []

        this.lastUpdated = new Date().getTime()
        this.delay = Math.ceil(getRandom(100, 1000))

        this.lastColorUpdated = new Date().getTime()
        this.delayColor = Math.ceil(getRandom(300, 5000))
    }

    // This function will be executed every frame
    loop(context){  
        this.changeStatus(context)
        this.move(context)
        this.createConnections(context)
    }

    // Allow the node to move around the space
    move(context){
        this.acceleration = Vector.substract(this.moveTo, this.position)

        if (this.acceleration.module() < 10) {
            this.speed = Vector.zero()

            this.moveTo = new Vector(getRandom(0, context.width), getRandom(0, context.height), 0)
            this.accelerationRate = getRandom(getRandom(100, 1000), 5000) * 100
        }

        let distance = this.acceleration.module() / this.accelerationRate

        this.acceleration = this.acceleration.normalize()
        this.acceleration = Vector.scalarMul(this.acceleration, distance)

        this.speed = Vector.sum(this.speed, this.acceleration)

        this.position = Vector.sum(this.position, this.speed)
        
        context.drawCircle(this.position, this.color, this.size)
    }

    // Creates the connections between nodes
    createConnections(context){
        if (this.lastUpdated + this.delay < new Date().getTime()){
            this.selected = []
            let dragonFlies = context.findByTag(this.tag)

            dragonFlies.sort((a, b)=>{
                let vecA = Vector.substract(this.position, a.position)
                let vecB = Vector.substract(this.position, b.position)

                return vecA.module() - vecB.module()
            })

            for (let i = 0; i < Math.ceil(getRandom(0, dragonFlies.length - 1)); i++){
                this.selected.push(dragonFlies[i])
            }
            
            this.lastUpdated = new Date().getTime()
            this.delay = Math.ceil(getRandom(100, 1000))
        }
        
        for (let i = 0; i < this.selected.length; i++){
            context.drawLine(this.position, this.selected[i].position, this.color)
        }
    }

    changeStatus(context){
        if (this.lastColorUpdated + this.delayColor < new Date().getTime()){
            let center = new Vector(context.width / 2.0, context.height / 2.0, 0)
            
            let distance = Vector.substract(center, this.position).module()

            this.color = getRandomColor()
            this.size = getRandom(0, 5)

            let centerDist = center.module()

            this.color[3] = 0.4 - 0.4*(distance / centerDist)

            this.delayColor = Math.ceil(getRandom(300, 5000))
            this.lastColorUpdated = new Date().getTime()
        }
    }
}