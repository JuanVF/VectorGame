class Vector {
    static errors = new Map([
        ["ANGLE", "Vector: cannot get angle from Zero Vector..."],
        ["PROJECTION", "Vector: cannot get projection from a Zero Vector..."],
        ["UNIT_VECTOR","Vector: cannot get unit vector from Zero Vector"]
    ])

    // Creates a new R3 vector
    constructor(x, y, z){
        this.x = x
        this.y = y
        this.z = z
    }

    // Given 2 R3 Vectors apply the sum operation
    static sum(vecA, vecB){
        let rst = new Vector(0, 0, 0)

        rst.x = vecA.x + vecB.x
        rst.y = vecA.y + vecB.y
        rst.z = vecA.z + vecB.z

        return rst
    }

    // Given 2 R3 Vectors apply the substract operation
    static substract(vecA, vecB){
        let rst = new Vector(0, 0, 0)

        rst.x = vecA.x - vecB.x
        rst.y = vecA.y - vecB.y
        rst.z = vecA.z - vecB.z

        return rst
    }

    // Given 2 R3 Vectors apply the multiply operation
    static mul(vecA, vecB){
        let rst = 0

        rst += vecA.x * vecB.x
        rst += vecA.y * vecB.y
        rst += vecA.z * vecB.z

        return rst
    }

    // Given a R3 vector apply the scalar operation to it
    static scalarMul(vec, num){
        let rst = new Vector(0, 0, 0)

        rst.x = vec.x * num
        rst.y = vec.y * num
        rst.z = vec.z * num

        return rst
    }
    
    // Given 2 R3 Vectors apply the cross point operation
    static crossPoint(vecA, vecB){
        let rst = new Vector(0, 0, 0)

        rst.x = vecA.y * vecB.z - vecA.z * vecB.y
        rst.y = vecA.z * vecB.x - vecA.x * vecB.z
        rst.z = vecA.x * vecB.y - vecA.y * vecB.x

        return rst
    }

    // Given two R3 vectors, returns the angle between them
    // None of the vectors can be the Zero Vector
    static angle(vecA, vecB){
        let amod = vecA.module()
        let bmod = vecB.module()
        
        try {
            if (amod === 0 || bmod === 0) throw Vector.errors.get("ANGLE")
            
            let rst = Vector.mul(vecA, vecB) / (amod * bmod)

            return Math.acos(rst)
        } catch (error) {
            console.error(error)
            return undefined
        }
    }

    // Given two vectors, returns true if both are equals
    static equals(vecA, vecB){
        return vecA.x === vecB.x && vecA.y === vecB.y && vecA.z === vecB.z
    }

    // Given a R3 vector apply the projection over the base vector
    static projection(base, proj){
        let mod = Math.pow(base.module(), 2)

        try {
            if (mod === 0) throw Vector.errors.get("PROJECTION")

            let scalar = Vector.mul(base, proj) / mod

            return Vector.scalarMul(base, scalar)
        } catch (error) {
            console.error(error)
            return undefined
        }
    }

    // Returns true if two vectors are orthogonal
    static areOrthogonal(vecA, vecB){
        return Vector.mul(vecA, vecB) === 0
    }

    // Returns the parallelogram area generated between two vectors
    static parallelogramArea(vecA, vecB){
        return Vector.crossPoint(vecA, vecB).module()
    }

    // Returns the triangle area generated between two vectors
    static triangleArea(vecA, vecB){
        return Vector.parallelogramArea(vecA, vecB) / 2.0
    }

    // Returns the module of a R3 vector
    module(){
        let sum = Vector.mul(this, this)

        return Math.sqrt(sum)
    }

    // Returns a parallel r3 vector which module is one
    getUnitVector(){
        let rst = this.copy()
        let mod = this.module()

        try {
            if (mod === 0) throw Vector.errors.get("UNIT_VECTOR")

            return Vector.scalarMul(rst, 1.0 / mod)
        } catch (error) {
            console.error(error)
            return undefined
        }
    }

    // Returns a copy of the vector
    copy(){
        return new Vector(this.x, this.y, this.z)
    }
}