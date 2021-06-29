class PerlinNoise {
    constructor(){
        this.Perm = [

        ]
        this.constantVecs = [
            new Vector(1.0, 1.0),
            new Vector(-1.0, 1.0),
            new Vector(-1.0, -1.0),
            new Vector(1.0, -1.0)
        ]
        this.freq = 0.045
        this.blocks = 255

        this.initPermutation()
    }

    // Returns the linear interpolation given a range
    static lerp(value, min, max){
        return min + value * (max - min)
    }

    // Fade function from Perlin Noise
    static fade(value){
        return ((6*value - 15)*value + 10)*Math.pow(value, 3)
    }

    // Shuffles a list
    static shuffle(list){
        for (let i = list.length - 1; i > 0; i--){
            let index = Math.round(Math.random()*(i-1))
            let temp = list[i]

            list[i] = list[index]
            list[index] = temp
        }
    }

    // Initialize the permutation table
    initPermutation(seed){
        if (this.Perm.length != 0){
            PerlinNoise.shuffle(this.Perm)
            return
        }

        this.Perm = []

        for (let i = 0; i < this.blocks + 1; i++){
            this.Perm.push(i)
        }

        PerlinNoise.shuffle(this.Perm)

        for (let i = 0; i < this.blocks + 1; i++){
            this.Perm.push(this.Perm[i])
        }
    }

    // Receives a R2 vector
    noise2D(vec){
        // Adjust the values to a frequency to avoid zeros in integers
        let point = Vector.scalarMul(vec.copy(), this.freq)

        let intPoint = new Vector(Math.floor(point.x) & this.blocks, Math.floor(point.y) & this.blocks)
        let floatPoint = new Vector(point.x - intPoint.x, point.y - intPoint.y)

        let cornerVectors = [
            new Vector(floatPoint.x - 1.0, floatPoint.y - 1.0), // Top - Right
            new Vector(floatPoint.x, floatPoint.y - 1.0), // Top - Left
            new Vector(floatPoint.x - 1.0, floatPoint.y),// Bottom - right
            new Vector(floatPoint.x, floatPoint.y) // Bottom - left
        ]

        let values = [
            this.Perm[this.Perm[intPoint.x+1]+intPoint.y+1], // Top - Right
            this.Perm[this.Perm[intPoint.x]+intPoint.y+1], // Top - Left
            this.Perm[this.Perm[intPoint.x+1]+intPoint.y], // Bottom - right
            this.Perm[this.Perm[intPoint.x]+intPoint.y] // Bottom - left
        ]

        let points = [
            Vector.mul(cornerVectors[0], this.constantVecs[values[0] & 3]),// Top - Right
            Vector.mul(cornerVectors[1], this.constantVecs[values[1] & 3]),// Top - Left
            Vector.mul(cornerVectors[2], this.constantVecs[values[2] & 3]),// Bottom - right
            Vector.mul(cornerVectors[3], this.constantVecs[values[3] & 3])// Bottom - left
        ]

        let lerpValues = [PerlinNoise.fade(floatPoint.x), PerlinNoise.fade(floatPoint.y)]

        return PerlinNoise.lerp(lerpValues[0], 
                                PerlinNoise.lerp(lerpValues[1], points[3], points[1]),
                                PerlinNoise.lerp(lerpValues[1], points[2], points[0]))
    }
}