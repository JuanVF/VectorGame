class Canvas{
    static errors = new Map([
        ["GO_UNDEFINED_INIT", "Canvas: Game Object init can not be undefined..."],
        ["GO_UNDEFINED_LOOP", "Canvas: Game Object loop can not be undefined..."],
        ["GO_DUP_ID", "Canvas: Game Object ID already registered..."]
    ])

    // Class constructor
    // Needs the object id, the width and height you wanna set
    constructor(id, width, height){
        this.canvasObject = document.getElementById(id)
        this.canvasContext = this.canvasObject.getContext('2d')
        this.isRunning = false;
        
        this.id = id
        this.width = width
        this.height = height

        this.canvasObject.width = width
        this.canvasObject.height = height

        this.bgColor = [255, 255, 255, 1]

        this.gameObjects = []
        this.gameObjectsByTag = new Map([])
        this.gameObjectsById = new Map([])

        this.mousePosition = new Vector(0, 0, 0)
    }

    // This starts the game loop
    async run(){
        this.isRunning = true;

        for (let i = 0; i < this.gameObjects.length; i++){
            await this.gameObjects[i].init(this)
        }

        this.canvasObject.addEventListener('mousemove', event => {
            this.mouseTracking(event)
        })

        window.requestAnimationFrame(()=>{
            this.gameLoop()
        })
    }

    // This loop will run every frame
    gameLoop(){
        this.drawBackground()

        for (let i = 0; i < this.gameObjects.length; i++) this.gameObjects[i].loop(this)
        
        // Keeps the fps until the game stop
        if (this.isRunning) window.requestAnimationFrame(()=>{
            this.gameLoop()
        })
    }

    // Return an array of objects that have a certain tag
    findByTag(tag){
        let results = []

        if (this.gameObjectsByTag.has(tag)) results = this.gameObjectsByTag.get(tag)

        return results
    }

    // Returns a certain Game Object by id
    find(id){
        return this.gameObjectsById.get(id)
    }

    // This appends a game object to the canvas
    // Throws error if init or loop functions hasn't been defined
    appendObject(obj){
        try {
            if (!obj.init) throw Canvas.errors.get("GO_UNDEFINED_INIT")
            if (!obj.loop) throw Canvas.errors.get("GO_UNDEFINED_LOOP")
            if (this.gameObjectsById.has(obj.ID)) throw Canvas.errors.get("GO_DUP_ID")

            this.gameObjects.push(obj)

            if (!this.gameObjectsByTag.has(obj.tag)){
                this.gameObjectsByTag.set(obj.tag, [])
            }
            
            this.gameObjectsById.set(obj.ID, obj)
            this.gameObjectsByTag.get(obj.tag).push(obj)
        } catch (error) {
            console.error(error)
        }
    }

    // Tracks the position of the mouse
    mouseTracking(event){
        if (!this.isRunning) return
    
        this.mousePosition.set(event.offsetX, event.offsetY, 0)
    }

    // Renders the background
    drawBackground(){
        let r = this.bgColor[0]
        let g = this.bgColor[1]
        let b = this.bgColor[2]
        let a = this.bgColor[3]

        this.canvasContext.beginPath()
        this.canvasContext.rect(0, 0, this.width, this.height)
        this.canvasContext.fillStyle = `rgba(${r},${g},${b},${a})`
        this.canvasContext.fill()
    }

    // Sets the background color
    setBackgroundColor(r, g, b, a){
        this.bgColor = [r, g, b, a]
    }

    // This functions draws a line between two points
    drawLine(initPos, endPos, color){
        this.canvasContext.beginPath()
        this.canvasContext.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`

        this.canvasContext.moveTo(initPos.x, initPos.y)
        this.canvasContext.lineTo(endPos.x, endPos.y)

        this.canvasContext.stroke()
    }

    // This functions draws a circle in a certain position
    drawCircle(pos, color, size){
        this.canvasContext.beginPath()
        this.canvasContext.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`
        this.canvasContext.arc(pos.x, pos.y, size, 0, 2 * Math.PI)
        this.canvasContext.fill()
    }

    // This function will draw the sprite if called by loop or init
    drawImage(figure, position){
        this.canvasContext.drawImage(
                figure, 
                position.x, position.y,
                figure.width, figure.height)
    }
}