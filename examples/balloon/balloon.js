class Balloon extends GameObject{
    constructor(ID){
        super(ID)
    }

    init(context){
        this.dimensions = new Vector(context.width, context.height, 0)
        this.position.set(500, 250, 0)
    }

    loop(context){
        this.update()
        this.castPosition(this.dimensions)
    }
}