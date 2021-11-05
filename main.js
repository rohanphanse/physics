document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const container = document.getElementById("container")
    const grid = document.getElementById("grid")

    // Container
    container.style.height = `${HEIGHT.value}px`
    container.style.width = `${WIDTH.value}px`

    // Grid
    createGrid(HEIGHT.value / BOX_UNIT.value, WIDTH.value / BOX_UNIT.value)

    function createGrid(rows, columns) {
        for (let r = 1; r < rows; r++) {
            new Line({
                parent: grid,
                start: { x: 0, y: HEIGHT.value * r / rows },
                end: { x: WIDTH.value, y: HEIGHT.value * r / rows },
                color: "#e8e8e8",
                useSVG: false
            })
        }
        for (let c = 1; c < columns; c++) {
            new Line({
                parent: grid,
                start: { x: WIDTH.value * c / columns, y: 0 },
                end: { x: WIDTH.value * c / columns, y: HEIGHT.value },
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
        position: { x: WIDTH.value / 2 - 50, y: HEIGHT.value / 2 - 50 },
        color: { stroke: "blue" }
    })

    const ground = new Rectangle({
        parent: container,
        height: 100,
        width: WIDTH.value,
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

