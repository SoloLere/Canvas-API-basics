const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
let isPressed = false;

// window.addEventListener('resize', function(){
//     canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// ctx.strokeStyle = 'white';
// ctx.beginPath();
// ctx.arc(100,100,200,0,Math.PI *2);
// ctx.fill()

// })

const mouse = {
    x: null,
    y: null,
}

canvas.addEventListener('mousedown', function(e){
    isPressed = true;
    mouse.x = e.x;
    mouse.y = e.y;
    // drawCircle();
})

canvas.addEventListener('mousemove', function(e){
    // isPressed = true;
    mouse.x = e.x;
    mouse.y = e.y;
    // drawCircle();
})

canvas.addEventListener('mouseup', function(e){
    isPressed = false;
    ctx.beginPath();
})

/*
function drawCircle(){
    if(!isPressed) return;
    // Paint brush
    ctx.lineWidth = '5'
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(mouse.x,mouse.y,10,0,Math.PI *2); //mouse.x = 200 //mouse.y = 200
    ctx.fill();

    //Olympics Logo
    // ctx.lineWidth = '10'
    // ctx.strokeStyle = 'aquamarine';
    // ctx.fillStyle = 'white';
    // ctx.beginPath();
    // ctx.arc(mouse.x,mouse.y,200,0,Math.PI *2); //mouse.x = 200 //mouse.y = 200
    // ctx.stroke()
    // ctx.beginPath();
    // ctx.arc((mouse.x + 400),mouse.y,200,0,Math.PI * 2);
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.arc((mouse.x + 800),mouse.y,200,0,Math.PI * 2);
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.arc((mouse.x + 200),(mouse.y + 200),200,0,Math.PI * 2);
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.arc((mouse.x + 600),(mouse.y + 200),200,0,Math.PI * 2);
    // ctx.stroke();

}
*/

class Particle {
    constructor(){
        // this.x = mouse.x;
        // this.y = mouse.y;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw() {
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 50,0,Math.PI * 2);
        ctx.fill();
    }
}

function init(){
    for (let i=0; i<100; i++){
        particlesArray.push(new Particle());
    };
}
init();

function handleParticles(){
    for(let i=0; i<particlesArray.length;i++){
        particlesArray[i].update();
        particlesArray[i].draw();
    }
}

function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    // drawCircle();
    handleParticles();
    requestAnimationFrame(animate)
};

animate();

