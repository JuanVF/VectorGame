class Controller extends GameObject {
    constructor(ID, initPos){
        super(ID)

        if (initPos) this.position = initPos
    }

    init(context){
        this.center = new Vector(context.width / 2.0, context.height / 2.0)
        // Distance between the initial particle pos and the center
        this.offset = 1
        // Amount of particles for circle mode
        this.amountParticle = 400
        // Amount of spikes to be generated in vortex mode
        this.spikes = 14
        
        // Initial data
        this.delay = 20
        this.time = new Date().getTime()

        this.angle = 0
        this.acc = 1.01

        // Delay between change mode time
        this.modeTime = new Date().getTime()
        this.modeDelay = 5000

        // Types of mode that exists
        // The value of the Hashmap should be a class
        // The values are:
        // function, delay, amount of particles, offset, acceleration rate of the particle
        this.modes = new Map([
            ['vortex', [()=>{
                this.putParticles(context, this.spikes, this.angle)
            }, 'circle', 20, 1, 1.01]],
            ['circle', [()=>{
                this.putParticles(context, this.amountParticle, 0)
                this.offset = Math.sin(Date.now()) * (100 - 50) + 50
            }, 'vortex', 500, 100, 1.02]],
        ])

        this.currentMode = 'vortex'
    }

    loop(context){
        // We will execute the mode right here
        if (this.time + this.delay < new Date().getTime()){
            this.modes.get(this.currentMode)[0]()

            this.angle += 0.5
            this.time = new Date().getTime()
        }

        // We will change between modes here
        // As I said, the value should be a class
        if (this.modeTime + this.modeDelay < new Date().getTime()){
            this.currentMode = this.modes.get(this.currentMode)[1]
            this.delay = this.modes.get(this.currentMode)[2]
            this.offset = this.modes.get(this.currentMode)[3]
            this.acc = this.modes.get(this.currentMode)[4]

            this.modeTime = new Date().getTime()
        }
    }

    // Put an amount of particles in the canvas
    putParticles(context, amount, angle){
        let particles = this.particleGenerator(amount, angle)

        for (let i = 0; i < particles.length; i++){
            context.appendObject(particles[i])
        }
    }

    // Generates the particles
    particleGenerator(amount, rot_angle){
        let particles = []
        let angleSum = 2.0*Math.PI / amount
        let angle = 0
        
        for (let i = 0; i < amount; i++){
            let rst = new Vector(this.offset, 0, 0).rotationZAxis(degrees2Radians(rot_angle))
            rst = rst.rotationZAxis(angle)

            // We need an ID so it can be destroyed by the Canvas
            let particle = new Particle(`particle_${new Date().getTime()}-${Math.random()}`, rst)
            particle.acc = this.acc
            particles.push(particle)

            angle += angleSum
        }

        return particles
    }
}