const getRandom = (min, max)=>{
    return Math.random() * (max - min) + min
}

const getRandomColor = ()=>{
    let r = Math.ceil(getRandom(0, 255))
    let g = Math.ceil(getRandom(0, 255))
    let b = Math.ceil(getRandom(200, 255))

    return new Color(r, g, b, getRandom(0, 0.5))
}

const getRandomColorP = (x, y, seed)=>{
    let r = Math.ceil(255*noise.simplex3(x, y, seed))
    let g = Math.ceil(255*noise.simplex3(x+2, y+2, seed))
    let b = Math.ceil(255*noise.simplex3(x+3, y+3, seed))

    return new Color(r, g, b, 1)
}

const clamp = (value, min, max)=>{
    return Math.min(Math.max(value, min), max)
}

const collide = (value, min, max)=>{
    let rst = clamp(value, min, max)

    return rst == min || rst == max
}

const toBinary = (num, spaces)=>{
    let bin = num.toString(2)
    let list = []

    let dif = Math.abs(bin.length - spaces)

    for (let i = 0; i < bin.length; i++){
        list.push(parseInt(bin[i]))
    }

    for (let i = 0; i < dif; i++){
        list.unshift(0)
    }

    return list
}

// Choose in a random way one of the 2 values
const choose = (A, B)=>{
    let prob = Math.random()

    return (prob > 0.5) ? A : B
}

const degrees2Radians = angle => {
    return angle * (Math.PI / 180.0)
}