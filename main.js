let canvas = document.querySelector("canvas")
let ctx = canvas.getContext("2d")

// set width and hieght
canvas.width = window.innerWidth - 4
canvas.height = window.innerHeight - 4
let h = canvas.offsetHeight
let w = canvas.offsetWidth


// setting 
let objectNumber = 200
let minRadius = 10
let maxRadius = 30
let minSpeed = -2
let maxSpeed = 2
let gravity = 0.5
let friction = 0.95
let sponeButtonMargin = 50

// responsive canvas
window.onresize = function() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    h = canvas.offsetHeight
    w = canvas.offsetWidth
    init()
}

//  mouse events
let mouse = {
    x: undefined,
    y:undefined
}
canvas.addEventListener("click", (e) => {
    init()
})


// object 
class Circle {
    constructor(x,y,dx,dy,radius) {
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.radius = radius
        this.color = ranColor()
        this.strokeColor = ranColor()
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0 , Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.strokeStyle = this.strokeColor
        ctx.fill()
        ctx.stroke()
    }

    move() {
        
       
        if(this.x + this.radius > w || this.x - this.radius < 0) {
            this.dx = -this.dx * friction
        }
        if(this.y + this.radius + this.dy > h || this.y - this.radius < 0) {
            this.dy = -this.dy
            this.dy *= friction 
            this.dx = this.dx * friction;
        } else {
            this.dy += gravity
        }


        this.x += this.dx
        this.y += this.dy
        this.draw()
    }
}

//helping functions

function ran(from, to, isInt=true,rounded=false) {
    let factor = 0
    if(!isInt) {
        factor = 0.5
    }
    
    let x = (Math.random() - factor)  * to
    while(x < from) {
        x = (Math.random() - factor) * to
    }

    if(rounded) {
        return Math.floor(x)
    }
    return x
}

function ranColor() {
    return `rgba(${ran(0, 255)}, ${ran(0,255)}, ${ran(0,255)}, 1)`
}

let objectArr = []

function init() {
    objectArr = []
    for(let i = 0; i < objectNumber; i++) {
        let radius = ran(minRadius, maxRadius)
        objectArr.push(new Circle(ran(radius, w - radius), ran(radius, h - radius - sponeButtonMargin)
        ,ran(-3, 3,false) , ran(1, 3), radius))
    }
}

function update() {
    requestAnimationFrame(update)
    ctx.clearRect(0,0,w,h)

    for (let ob of objectArr) {
        ob.move()
    }
}


update()
init()