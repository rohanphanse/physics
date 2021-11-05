const SVG_NAMESPACE = "http://www.w3.org/2000/svg"

class Line {
    constructor (params) {
        this.parent = params.parent
        this.start = params.start
        this.end = params.end
        this.color = params.color || "black"
        this.useSVG = params.useSVG !== undefined ? params.useSVG : true

        this.create()
    }

    create() {
        const line = document.createElementNS(SVG_NAMESPACE, "line")
        const id = generateID()
        line.id = id
        line.setAttribute("x1", this.start.x)
        line.setAttribute("y1", HEIGHT.value - this.start.y)
        line.setAttribute("x2", this.end.x)
        line.setAttribute("y2", HEIGHT.value - this.end.y);
        line.setAttribute("stroke", this.color)
        line.style.strokeWidth = "1"
        
        if (this.useSVG) {
            this.svg = document.createElementNS(SVG_NAMESPACE, "svg")
            this.svg.append(line)
            this.parent.append(this.svg)
        } else {
            this.parent.append(line)
        }

        // console.log(line, this.parent)
        this.line = document.getElementById(id)
 
    }
}

class Rectangle {
    constructor (params) {
        this.parent = params.parent
        this.position = params.position || { x: 0, y: 0 }
        this.height = params.height
        this.width = params.width
        this.color = params.color || { fill: "rgba(255, 255, 255, 0)", stroke: "black" }

        this.create()
    }

    create() {

        // Elements
        const svg = document.createElementNS(SVG_NAMESPACE, "svg")
        const rectangle = document.createElementNS(SVG_NAMESPACE, "rect")

        // SVG attributes
        svg.setAttribute("class", "sprite")
        svg.style.bottom = this.position.y - 1
        svg.style.left = this.position.x - 1
        const svgID = generateID()
        svg.id = svgID
        svg.setAttribute("width", this.width + 2)
        svg.setAttribute("height", this.height + 2)

        // Rectangle attributes
        const rectangleID = generateID()
        rectangle.id = rectangleID
        rectangle.setAttribute("x", "1");
        rectangle.setAttribute("y", "1");
        rectangle.setAttribute("width", this.width);
        rectangle.setAttribute("height", this.height);
        rectangle.setAttribute("fill", this.color.fill || "rgba(255, 255, 255, 0)");
        rectangle.setAttribute("stroke", this.color.stroke || this.color.fill);
        rectangle.style.strokeWidth = "1"

        svg.append(rectangle)
        this.parent.append(svg)

        this.svg = document.getElementById(svgID)

        this.rectangle = document.getElementById(rectangleID)

        // SVG CSS styles

    }

    updatePosition(newPosition) {
        this.position = newPosition
        this.svg.style.bottom = this.position.y - 1
        this.svg.style.left = this.position.x - 1
    }
}