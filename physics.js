class Sprite {
    constructor (params) {
        this.sprite = params.sprite
        this.position = params.position || this.sprite.position
        this.velocity = params.velocity || { x: 0, y: 0 }
        this.acceleration = params.acceleration || { x: 0, y: 0 }
        this.mass = params.mass
        console.log(this.position, this.velocity, this.acceleration, this.mass)
        this.forces = {}
        this.keysDown = []
        this.controls = params.controls
        this.id = generateID()

        // Initial
        this.sprite.updatePosition(this.position)

        // Gravitational force
        const gravity = { x: 0, y:  this.mass * -0.098 }
        const normal = { x: 0, y: this.position.y <= 100 ? -gravity.y : 0 }
        this.forces["gravity"] = gravity
        this.forces["normal"] = normal


    }

    move() {
        const netForce = { x: 0, y: 0 }
        for (const force in this.forces) {
            netForce.x += this.forces[force].x
            netForce.y += this.forces[force].y
        }
        // console.log(netForce)
        this.acceleration.x = netForce.x / this.mass
        this.acceleration.y = netForce.y / this.mass

        this.velocity.x += this.acceleration.x
        this.velocity.y += this.acceleration.y
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.position.y = this.position.y <= 100 ? 100 : this.position.y

        this.sprite.updatePosition(this.position)

        // Recalculations
        this.forces["normal"].y = this.position.y <= 100 ? -this.forces["gravity"].y : 0
        this.velocity.y = this.position.y <= 100 ? 0 : this.velocity.y
    }
}

class World {
    constructor(params) {
        this.time = 0
        this.sprites = []
        this.tasks = []
    }

    start() {
        this.frame = () => {
            this.testTime = Date.now()
            for (let t = 0; t < this.tasks.length; t++) {
                const task = this.tasks[t]
                if (task.time <= this.time) {
                    task.taskFunction()
                    delete this.tasks[t]
                }
            }
            this.tasks = this.tasks.filter(e => e !== undefined)

            for (let s = 0; s < this.sprites.length; s++) {
                this.sprites[s].move()
            }

            // Next frame
            this.time += FPS
            this.loop = requestAnimationFrame(this.frame)
        }
        
        // First frame
        this.loop = requestAnimationFrame(this.frame)
    }

    createTask(spriteRef, taskString, value, startTime) {
        let sprite = null
        for (const s of this.sprites) {
            if (s.id === spriteRef.id) {
                sprite = s
                break
            }
        }

        let taskFunction = null
        switch (taskString) {
            case "add-force":
                taskFunction = () => (sprite.forces[value.name] = value.force)
                break
            case "update-force":
                taskFunction = () => (sprite.forces[value.name] = value.force)
                break
            case "delete-force":
                taskFunction = () => (delete sprite.forces[value.name])
                break
            case "update-acceleration":
                taskFunction = () => (sprite.acceleration = value)
                break
            case "update-velocity":
                taskFunction = () => (sprite.velocity = value)
                break
            case "update-position":
                taskFunction = () => (sprite.position = value)
                break
            default:
                console.log("Unknown task")
        }

        this.tasks.push({
            sprite,
            taskFunction,
            time: startTime ? frames * FPS : this.time
        })
    }
}