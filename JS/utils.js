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