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
        this.accelerationRate = getRandom(100, 150) * 10000

        this.moveTo = new Vector(getRandom(0, context.width), getRandom(0, context.height), 0)
        this.selected = []

        this.lastUpdated = new Date().getTime()
        this.delay = Math.ceil(getRandom(5000, 10000))

        this.lastColorUpdated = 0
        this.delayColor = Math.ceil(getRandom(300, 5000))

        this.connectionRate = 1
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
            this.accelerationRate = getRandom(50, 100) * 10000
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

            for (let i = 0; i < Math.ceil(getRandom(0, dragonFlies.length * this.connectionRate)); i++){
                this.selected.push(dragonFlies[i])
            }
            
            this.lastUpdated = new Date().getTime()
            this.delay = Math.ceil(getRandom(5000, 10000))
        }
        
        for (let i = 0; i < this.selected.length; i++){
            context.drawLine(this.position, this.selected[i].position, this.color)
        }
    }

    changeStatus(context){
        if (this.lastColorUpdated + this.delayColor < new Date().getTime()){
            this.color = getRandomColor()
            this.size = getRandom(0, 5)

            this.color.a = this.selected.length / (context.findByTag(this.tag).length * this.connectionRate)

            this.delayColor = Math.ceil(getRandom(1000, 10000))
            this.lastColorUpdated = new Date().getTime()
        }
    }
}