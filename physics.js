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
        // g = -100 pixels / s^2
        const gravity = { x: 0, y:  this.mass * -100 }
        const normal = { x: 0, y: this.position.y <= 100 ? -gravity.y : 0 }
        this.forces["gravity"] = gravity
        this.forces["normal"] = normal


    }

    move() {
        const netForce = { x: 0, y: 0 }
        // console.log("forces", this.forces)
        for (const force in this.forces) {
            netForce.x += this.forces[force].x
            netForce.y += this.forces[force].y
        }
        // console.log(netForce)
        this.acceleration.x = netForce.x / this.mass
        this.acceleration.y = netForce.y / this.mass

        const dt = 1 / FPS
        this.velocity.x += this.acceleration.x * dt
        this.velocity.y += this.acceleration.y * dt
        this.position.x += this.velocity.x * dt
        this.position.y += this.velocity.y * dt
        this.position.y = this.position.y <= 100 ? 100 : this.position.y

        this.sprite.updatePosition(this.position)

        // Recalculations
        this.forces["normal"].y = this.position.y <= 100 ? -this.forces["gravity"].y : 0
        this.velocity.y = this.position.y <= 100 ? 0 : this.velocity.y
    }
}

class World {
    constructor() {
        this.time = 0
        this.sprites = []
        this.tasks = []
    }

    start() {
        this.frame = () => {
            for (let t = 0; t < this.tasks.length; t++) {
                const task = this.tasks[t]
                if (task.time <= this.time) {
                    console.log(this.time, task)
                    task.taskFunction()
                    delete this.tasks[t]
                }
            }
            this.tasks = this.tasks.filter(e => e !== undefined)

            for (const sprite of this.sprites) {
                sprite.move()
            }

            // Next frame
            this.time++
            this.loop = requestAnimationFrame(this.frame)
        }
        
        // First frame
        this.loop = requestAnimationFrame(this.frame)
    }

    createTask(sprite, taskString, value, startTime = 0) {

        let taskFunction = null
        switch (taskString) {
            case "add-force":
                taskFunction = () => (sprite.forces[value.name] = value.force)
                break
            case "update-force":
                taskFunction = () => (sprite.forces[value.name] = value.force)
                break
            case "delete-force":
                taskFunction = () => (delete sprite.forces[value])
                break
            case "update-acceleration":
                taskFunction = () => (sprite.acceleration = value)
                break
            case "update-velocity":
                taskFunction = () => (sprite.velocity = value)
                break
            case "update-velocity-x":
                taskFunction = () => (sprite.velocity.x = value)
                break
            case "update-velocity-y":
                taskFunction = () => (sprite.velocity.y = value)
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
            time: startTime * FPS
        })
    }
}