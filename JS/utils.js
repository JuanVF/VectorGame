const getRandom = (min, max)=>{
    return Math.random() * (max - min) + min
}

const getRandomColor = ()=>{
    let r = Math.ceil(getRandom(0, 255))
    let g = Math.ceil(getRandom(0, 255))
    let b = Math.ceil(getRandom(150, 255))

    return [r, g, b, getRandom(0, 0.7)]
}