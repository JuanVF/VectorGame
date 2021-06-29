class Landscape extends GameObject {
    constructor(ID){
        super(ID)
    }

    init(context){
        this.position.set(500, 250, 0)
        this.dimensions = context.dimensions

        this.delay = 1000
        this.time = new Date().getTime()

        noise.seed(Math.random())

        this.counter = 0

        context.triggerBG()
    }

    loop(context){
        if (this.counter < 10 && this.time + this.delay < new Date().getTime()){
            context.drawBackground()

            for (let x = 0; x < this.dimensions.x; x++){
                for (let y = 0; y < this.dimensions.y; y++){
                    let color = getRandomColor()
                    color.a = noise.simplex3(x / 100, y / 100, this.counter)
    
                    context.drawPixel(new Vector(x, y), color)
                }   
            }
    
            this.counter += 0.1
            this.time = new Date().getTime()
        }
    }
}