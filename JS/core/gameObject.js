class GameObject {
    constructor(ID){
        this.position = new Vector(0, 0, 0)
        this.speed = new Vector(0, 0, 0)
        this.acceleration = new Vector(0, 0, 0)
        this.speedLimit = 0

        this.tag = ""
        this.ID = ID
        this.sprite = undefined
        this.figure = undefined
    }

    // This function will be executed first and once
    // This function can be async
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

    // This method will return an image
    static loadImage(url, width, height){
        return new Promise(r => {
            let img = new Image(width, height)
            img.onload = () => r(img)
            img.src = url
        })
    }
}