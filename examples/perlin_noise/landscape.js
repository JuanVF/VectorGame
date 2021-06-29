class Landscape extends GameObject {
    constructor(ID){
        super(ID)
    }

    init(context){
        this.position.set(500, 250, 0)
        this.dimensions = context.dimensions
        this.delay = 10

        this.time = new Date().getTime()
        this.perlin = new PerlinNoise()
        this.perlin.freq = 0.03

        context.triggerBG()
    }

    loop(context){
        if (this.time + this.delay < new Date().getTime()){
            context.drawBackground()
            this.perlin.initPermutation()
    
            for (let x = 0; x < this.dimensions.x; x++){
                for (let y = 0; y < this.dimensions.y; y++){
                    let color = getRandomColor()
                    color.a = this.perlin.noise2D(new Vector(x, y))

                    context.drawPixel(new Vector(x, y), color)
                }   
            }

            this.time = new Date().getTime()
        }
    }
}