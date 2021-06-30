class GameObject {
    constructor(ID){
        this.position = new Vector(0, 0, 0)
        this.speed = new Vector(0, 0, 0)
        this.acceleration = new Vector(0, 0, 0)
        this.speedLimit = Infinity
        this.mass = 1

        this.tag = ""
        this.ID = ID
        this.sprite = undefined
        this.figure = undefined
    }

    // This function will be executed first and once
    // This function can be async in order to load some media
    init(context){
    }

    // This function will be executed every frame
    loop(context){
    }

    // By executing this it will prevent your speed to increase up to the speed of light!
    limitSpeed(){
        if (this.speed.module() > this.speedLimit)
            this.speed = this.speedLimit
    }

    // This will update the velocity and position of the object
    update(){
        this.speed = Vector.sum(this.speed, this.acceleration)
        this.position = Vector.sum(this.position, this.speed)
        this.acceleration = Vector.zero()
    }

    // This will apply a force (vector) to the this object
    // By default the mass of a Game Object
    applyForce(force){
        let rst = Vector.scalarMul(force, 1.0 / this.mass)
        this.acceleration = Vector.sum(this.acceleration,rst)
    }

    // If the object collide with the "walls" it will receive Newtons power
    // This only works in R2
    applyWallForce(dimensions){
        let collideX = collide(this.position.x, 0, dimensions.x)
        let collideY = collide(this.position.x, 0, dimensions.x)

        if (collideX || collideY){
            let oposite = Vector.scalarMul(this.speed, -0.5 )
            this.speed = Vector.zero()

            this.applyForce(Vector.scalarMul(oposite, 0.01))
        }
    }

    // This will cast the position of the player to not overflow a certain dimension
    castPosition(dimensions){
        this.position.x = clamp(this.position.x, 0, dimensions.x)
        this.position.y = clamp(this.position.y, 0, dimensions.y)
        this.position.z = clamp(this.position.z, 0, dimensions.z)
    }

    // This method will return an image
    static loadImage(url, width, height){
        return new Promise(r => {
            let img = new Image(width, height)
            img.onload = () => r(img)
            img.src = url
        })
    }
}