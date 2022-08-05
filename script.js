const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
let isPressed;
let hue = 0;

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
};

canvas.addEventListener("mousedown", function (e) {
  //   isPressed = true;
  mouse.x = e.x;
  mouse.y = e.y;
  init();

  // drawCircle();
});

canvas.addEventListener("mousemove", function (e) {
  // isPressed = true;
  mouse.x = e.x;
  mouse.y = e.y;
  init();

  // drawCircle();
});

canvas.addEventListener("mouseup", function (e) {
  isPressed = false;
  ctx.beginPath();
});

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
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    // this.x = Math.random() * canvas.width;
    // this.y = Math.random() * canvas.height;
    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = `hsl(${hue}, 100%, 50%)`;
  }

  update() {
    // console.log(isPressed);
    // if(!isPressed)return;
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }

  draw() {
    // if(!isPressed)return;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  for (let i = 0; i < 2; i++) {
    particlesArray.push(new Particle());
  }
}

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx ** 2 + dy ** 2);
      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = particlesArray[i].color;
        ctx.linewidth = 0.2;
        ctx.moveTo(particlesArray[i].x ,particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x ,particlesArray[j].y);
        ctx.stroke();
      }
    }
    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.fillStyle = `rgba(0,0,0,0.1)`;
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
  // drawCircle();
  handleParticles();
  hue += 5;
  requestAnimationFrame(animate);
}

animate();
