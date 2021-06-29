const getRandom = (min, max)=>{
    return Math.random() * (max - min) + min
}

const getRandomColor = ()=>{
    let r = Math.ceil(getRandom(0, 255))
    let g = Math.ceil(getRandom(0, 255))
    let b = Math.ceil(getRandom(200, 255))

    return new Color(r, g, b, getRandom(0, 0.5))
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