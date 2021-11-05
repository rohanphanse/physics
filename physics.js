class Sprite {
    constructor (params) {
        this.sprite = params.sprite
        this.position = params.position || this.sprite.position
        this.velocity = params.velocity || { x: 0, y: 0 }
        this.acceleration = params.acceleration || { x: 0, y: 0 }
        this.mass = params.mass
        this.forces = {}
        this.keysDown = []
        this.controls = params.controls

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
        this.world = params.world
        this.time = 0
        this.sprites = []
    }
}