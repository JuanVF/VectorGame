class Color{
    constructor(r, g, b, a){
        this.r = r || 0
        this.g = g || 0
        this.b = b || 0
        this.a = a || 1
    }

    // Generates a color from an array
    static fromArray(color){
        return new Color(color[0], color[1], color[2], color[3])
    }

    // Generates black color
    static black(){
        return new Color(0, 0, 0, 1)
    }

    // Generates white color
    static white(){
        return new Color(255, 255, 255, 1)
    }

    // Generates red color
    static red(){
        return new Color(255, 0, 0, 1)
    }

    // Generates red color
    static green(){
        return new Color(0, 255, 0, 1)
    }

    // Generates red color
    static blue(){
        return new Color(0, 0, 255, 1)
    }

    // Returns a string in CSS format
    getRGBA(){
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
    }
}