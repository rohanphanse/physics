document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const container = document.getElementById("container")
    const grid = document.getElementById("grid")

    // Container
    container.style.height = `${HEIGHT}px`
    container.style.width = `${WIDTH}px`

    // Grid
    createGrid(HEIGHT / BOX_UNIT, WIDTH / BOX_UNIT)

    function createGrid(rows, columns) {
        for (let r = 1; r < rows; r++) {
            new Line({
                parent: grid,
                start: { x: 0, y: HEIGHT * r / rows },
                end: { x: WIDTH, y: HEIGHT * r / rows },
                color: "#e8e8e8",
                useSVG: false
            })
        }
        for (let c = 1; c < columns; c++) {
            new Line({
                parent: grid,
                start: { x: WIDTH * c / columns, y: 0 },
                end: { x: WIDTH * c / columns, y: HEIGHT },
                color: "#e8e8e8",
                useSVG: false
            })
        }
    }

    const box = new Rectangle({
        parent: container,
        height: 50,
        width: 50,
        position: { x: 0, y: 100 }
    })

    const blueBox = new Rectangle({
        parent: container,
        height: 100,
        width: 100,
        position: { x: WIDTH / 2 - 50, y: HEIGHT / 2 - 50 },
        color: { stroke: "blue" }
    })

    const ground = new Rectangle({
        parent: container,
        height: 100,
        width: WIDTH,
        position: { x: 0, y: 0 }
    })

    const tinyBox = new Rectangle({
        parent: container,
        height: 20,
        width: 20,
        position: { x: 300, y: 400 },
        color: { stroke: "red" }
    })

    const boxSprite = new Sprite({
        sprite: box, 
        mass: 2
    })

    const tinyBoxSprite = new Sprite({
        sprite: tinyBox,
        position: { x: 0, y: 100 },
        mass: 30
    })

    const blueBoxSprite = new Sprite({
        sprite: blueBox,
        mass: 10
    })

    // const world = new World()
    // world.sprites.push(boxSprite)
    // world.sprites.push(tinyBoxSprite)
    // world.sprites.push(blueBoxSprite)

    // world.createTask(boxSprite, "update-velocity", { x: 3, y: 0 })
    // world.start()

    demo1()
    
    function demo1() {
        blueBoxSprite.forces["applied-up"] = { x: 0, y: -blueBoxSprite.forces["gravity"].y }
        console.log(blueBoxSprite.forces)

        setTimeout(() => {
            boxSprite.velocity = { x: 3, y: 0 }
        }, 500)

        setTimeout(() => {
            tinyBoxSprite.velocity = { x: 3, y: 0 }
        }, 4000)

        setTimeout(() => {
            tinyBoxSprite.velocity = { x: 2, y: 10 }
        }, 4500)

        const time = setInterval(() => {
            boxSprite.move()
            tinyBoxSprite.move()
            blueBoxSprite.move()
        }, 10)

        setTimeout(() => {
            boxSprite.velocity.y = 8
        }, 1000)

        setTimeout(() => {
            tinyBoxSprite.forces["applied-left"] = { x: -1, y: 0 }
        }, 7000)

        setTimeout(() => {
            delete blueBoxSprite.forces["applied-up"]
            console.log(blueBoxSprite.forces)
        }, 12000)

        setTimeout(() => {
            clearInterval(time)
        }, 15000)
    }
})

