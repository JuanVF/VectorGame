class Canvas{
    static errors = new Map([
        ["GO_UNDEFINED_INIT", "Canvas: Game Object init can not be undefined..."],
        ["GO_UNDEFINED_LOOP", "Canvas: Game Object loop can not be undefined..."]
    ])

    // Class constructor
    // Needs the object id, the width and height you wanna set
    constructor(id, width, height){
        this.id = id
        this.width = width
        this.height = height

        this.canvasObject = document.getElementById(id)
        this.canvasContext = this.canvasObject.getContext('2d')
        this.isRunning = false;

        this.gameObjects = []
    }

    // This starts the game loop
    run(){
        this.isRunning = true;

        for (let i = 0; i < this.gameObjects.length; i++){
            this.gameObjects[i].init(this)
        }

        window.requestAnimationFrame(()=>{
            this.gameLoop()
        })
    }

    // This loop will run every frame
    gameLoop(){
        for (let i = 0; i < this.gameObjects.length; i++) this.gameObjects[i].loop(this)
        
        // Keeps the fps until the game stop
        if (this.isRunning) window.requestAnimationFrame(()=>{
            this.gameLoop()
        })
    }

    // This appends a game object to the canvas
    // Throws error if init or loop functions hasn't been defined
    appendObject(obj){
        try {
            if (!obj.init) throw Canvas.errors.get("GO_UNDEFINED_INIT")
            if (!obj.loop) throw Canvas.errors.get("GO_UNDEFINED_LOOP")

            this.gameObjects.push(obj)
        } catch (error) {
            console.error(error)
        }
    }
}