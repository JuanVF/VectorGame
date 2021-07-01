class Canvas{
    static errors = new Map([
        ["GO_UNDEFINED_INIT", "Canvas: Game Object init can not be undefined..."],
        ["GO_UNDEFINED_LOOP", "Canvas: Game Object loop can not be undefined..."],
        ["GO_DUP_ID", "Canvas: Game Object ID already registered..."]
    ])

    // Class constructor
    // Needs the object id, the width and height you wanna set
    constructor(id, width, height, useAlpha){
        this.canvasObject = document.getElementById(id)
        if (useAlpha){
            this.canvasContext = this.canvasObject.getContext('2d')
        }else{
            this.canvasContext = this.canvasObject.getContext('2d', { alpha: false })
        }

        this.isRunning = false
        this.isOnPause = false
        this.shouldDrawBG = true
        
        this.id = id
        this.width = width
        this.height = height
        this.dimensions = new Vector(width, height, 0)
        this.offset = new Vector(0, 0, 0)

        this.canvasObject.width = width
        this.canvasObject.height = height

        this.bgColor = Color.white()

        this.gameObjects = []
        this.gameObjectsByTag = new Map([])
        this.gameObjectsById = new Map([])

        this.mousePosition = new Vector(0, 0, 0)
    }

    // This starts the game loop
    async run(){
        this.drawBackground()
        this.isRunning = true;

        let amount = this.gameObjects.length

        for (let i = 0; i < amount; i++){
            await this.gameObjects[i].init(this)
        }

        this.canvasObject.addEventListener('mousemove', event => {
            this.mouseTracking(event)
        })
        
        document.addEventListener("visibilitychange", event => {
            this.userStateTracking(event)
        });

        this.counter = false
        window.requestAnimationFrame(()=>{
            this.gameLoop()
        })
    }

    // This loop will run every frame
    gameLoop(){
        if (!this.isOnPause){
            if (this.shouldDrawBG) this.drawBackground()
    
            for (let i = 0; i < this.gameObjects.length; i++) this.gameObjects[i].loop(this)
        }
        
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
    
    // Takes out an object from the canvas and also set it null
    // so the garbage collector will take it
    destroy(id){
        if (!this.gameObjectsById.has(id)) return

        let obj = this.gameObjectsById.get(id)
        this.gameObjectsById.delete(id)

        let tags = this.gameObjectsByTag
        
        // We take out the element from the tag map
        for (let i = 0; i < tags.length; i++){
            if (tags[i].ID == id){
                tags.splice(i, 1)
                break
            }
        }

        // We take out the element from the loop list
        for (let i = 0; i < this.gameObjects.length; i++){
            if (this.gameObjects[i].ID == id){
                this.gameObjects.splice(i, 1)
                break
            }
        }

        obj = null
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

            if (this.isRunning) obj.init(this)
        } catch (error) {
            console.error(error)
        }
    }

    // Translate the center of the canvas
    setCenter(dimensions){
        this.offset = dimensions.copy()
        this.canvasContext.translate(dimensions.x, dimensions.y)
    }

    // Tracks the position of the mouse
    mouseTracking(event){
        if (!this.isRunning) return
    
        this.mousePosition.set(event.offsetX, event.offsetY, 0)
    }

    // Tracks when an user exit the window
    // if true canvas will pause execution
    userStateTracking(event){
        this.isOnPause = document.hidden
    }

    // Trigger the state of redraw the background
    triggerBG(){
        this.shouldDrawBG = !this.shouldDrawBG
    }

    // Renders the background
    drawBackground(){
        this.drawRect(Vector.substract(Vector.zero(), this.offset.copy()), this.dimensions.copy(), this.bgColor)
    }

    // Sets the background color
    setBackgroundColor(r, g, b, a){
        this.bgColor = new Color(r, g, b, a)
    }

    // Draws a rect
    drawRect(initPos, endPos, color){
        endPos.x = Math.abs(initPos.x - endPos.x)
        endPos.y = Math.abs(initPos.y - endPos.y)

        this.canvasContext.beginPath()
        this.canvasContext.rect(
            initPos.x, initPos.y, 
            endPos.x, endPos.y)
        this.canvasContext.fillStyle = color.getRGBA()
        this.canvasContext.fill()
    }

    // This functions draws a line between two points
    drawLine(initPos, endPos, color){
        this.canvasContext.beginPath()
        this.canvasContext.strokeStyle = color.getRGBA()

        this.canvasContext.moveTo(initPos.x, initPos.y)
        this.canvasContext.lineTo(endPos.x, endPos.y)

        this.canvasContext.stroke()
    }

    // This functions draws a circle in a certain position
    drawCircle(pos, color, size){
        this.canvasContext.beginPath()
        this.canvasContext.fillStyle = color.getRGBA()
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

    // Draws a single pixel on canvas
    drawPixel(position, color){
        this.canvasContext.beginPath()
        this.canvasContext.fillRect(position.x, position.y, 1, 1)
        this.canvasContext.fillStyle = color.getRGBA()
        this.canvasContext.fill()
    }
}