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
        mass: 30
    })

    const tinyBoxSprite = new Sprite({
        sprite: tinyBox,
        position: { x: 0, y: 100 },
        mass: 2
    })

    const blueBoxSprite = new Sprite({
        sprite: blueBox,
        mass: 10
    })

    demo()

    function demo() {
        const world = new World()
        world.sprites.push(boxSprite)
        world.sprites.push(tinyBoxSprite)
        world.sprites.push(blueBoxSprite)
    
        world.createTask(blueBoxSprite, "add-force", {
            name: "applied-up",
            force: { x: 0, y: -blueBoxSprite.forces["gravity"].y }
        })
        world.createTask(boxSprite, "update-velocity", { x: 100, y: 0 }, 0.5)
        world.createTask(boxSprite, "update-velocity-y", 250, 1.5)
        world.createTask(tinyBoxSprite, "update-velocity", { x: 75, y: 0 }, 8)
        world.createTask(tinyBoxSprite, "update-velocity-y", 300, 11)
        world.createTask(boxSprite, "update-velocity", { x: 0, y: 0 }, 15)
        world.createTask(tinyBoxSprite, "add-force", {
            name: "applied-left",
            force: { x: -50, y: 0 }
        }, 18)
        world.createTask(blueBoxSprite, "delete-force", "applied-up", 30)
        world.createTask(tinyBoxSprite, "delete-force", "applied-left", 32)
        
        world.start()
    }
})

