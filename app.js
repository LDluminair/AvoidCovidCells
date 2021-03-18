const canvas = document.querySelector('canvas');

canvas.width = 350
canvas.height = 350

const c = canvas.getContext('2d');

var anmt = true;
var score = 0;
var nxtLvl = 0;
var highscore = 0;

//create player box
var playerObject = [];
var mradius = 10;
var mx = 175
var my = 175
//box movement
var speed = 1.8;
var mdx = speed;
var mdy = speed;
//create coin
var mcx = Math.floor(Math.random() * (canvas.width - 5 * 2) + 5)
var mcy = Math.floor(Math.random() * (canvas.width - 5 * 2) + 5)
//create evil
var evil = 1;
var evilObject = [];

//keyboard interaction
var left = false
var right = false
var up = false
var down = false

//detect player movement from arrow keys
window.addEventListener('keydown', function(event) {
  key = event.keyCode;


  if (key == 39) {
    right = true
  }
  if (key == 37) {
    left = true
  }
  if (key == 38) {
    up = true
  }
  if (key == 40) {
    down = true
  }
  if (anmt == false && key == 32){
    highScore()
    evilObject = [];
    playerObject = [];
    evil = 1;
    score = 0;
    nxtLvl = 0;
    $('#score').html(score)
    anmt = true;
    animate()
    createPlayer()
    init()

  }
})

window.addEventListener('keyup', function(event) {
  key = event.keyCode;

  if (key == 39) {
    right = false
  }
  if (key == 37) {
    left = false
  }
  if (key == 38) {
    up = false
  }
  if (key == 40) {
    down = false
  }
})
function highScore(){
  if(score > highscore){
    highscore = score
    $('#savedScore').html(highscore)

  }

}


// create coin and coin interation with player
function coin() {
  c.beginPath();
  c.fillStyle = "rgba(255,255,0,1)";
  c.arc(mcx, mcy, 5, 0, Math.PI * 2, false)
  c.fill();
  c.stroke();

  if (mcx - 5 < this.mx + 10 && mcx + 5 > this.mx &&
    mcy - 5 < this.my + 10 && mcy + 5 > this.my) {
    score++
    nxtLvl++
    $('#score').html(score)
    mcx = Math.floor(Math.random() * (canvas.width - 5 * 2) + 5)
    mcy = Math.floor(Math.random() * (canvas.width - 5 * 2) + 5)
    coin();
  }
}

function Player(mx, my, mdx, mdy, mradius){

  this.mx = mx;
  this.my = my;
  this.mdx = mdx;
  this.mdy = mdy;
  this.mradius = mradius;

  this.drawPlayer = function(){
    c.beginPath();
    c.fillStyle = "rgba(0, 255, 0, .5)"
    c.strokeStyle = "blue"
                                      // arc(x, y, radius, ?, Math.PI, draw counter clockwise?)
                                      //c.rect(x, y, width, height)
    c.rect(this.mx, this.my, this.mradius, this.mradius)

    c.fill();
    c.stroke();
  }
  this.updatePlayer = function(){

// keep player in the box
    if (this.mx + this.mradius > canvas.width) {
      this.mx = canvas.width - this.mradius
    } else if (this.mx < 0) {
      this.mx = 0
    } else if (this.my + this.mradius > canvas.height) {
      this.my = canvas.height - this.mradius
    } else if (this.my < 0) {
      this.my = 0
    }
// move player
  if (up == true) {
    this.my -= mdy;
  }
  if (down == true) {
    this.my += mdy;
  }
  if (right == true) {
    this.mx += mdx;
  }
  if (left == true) {
    this.mx -= mdx;
  }
//collect coins
  if (mcx - 5 < this.mx + 10 && mcx + 5 > this.mx &&
    mcy - 5 < this.my + 10 && mcy + 5 > this.my) {
    score++
    nxtLvl++
    $('#score').html(score)
    mcx = Math.floor(Math.random() * (canvas.width - 5 * 2) + 5)
    mcy = Math.floor(Math.random() * (canvas.width - 5 * 2) + 5)
    coin();
  }

    this.drawPlayer();
    return mx = this.mx
    return my = this.my
  }
}
function Evil(x, y, dx, dy, mx, my) {

  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  mx = mx;
  my = my;

  this.drawEvil = function() {
    c.beginPath()
    c.fillStyle = "rgba(255, 0, 0, 1)"
    c.arc(this.x, this.y, 5, 0, Math.PI * 2, false)
    c.fill()
    c.stroke()

  }

  this.update = function() {
    if (this.x + 5 > canvas.width || this.x - 5 < 0) {
      this.dx = -this.dx
    }
    if (this.y + 5 > canvas.height || this.y - 5 < 0) {
      this.dy = -this.dy
    }
    this.x += this.dx
    this.y += this.dy

    // obstical interaction w/ player

    if (this.x + 6 > playerObject[0].mx && this.x - 6 < playerObject[0].mx + 10.5 &&
      this.y + 6 > playerObject[0].my && this.y - 6 < playerObject[0].my + 10.5) {
      anmt = false;
      highScore()


    }
    // add evil after 3 coins are collected
    if (nxtLvl == 3) {
      evil += 2
      nxtLvl = 0;
      init()

    }

    this.drawEvil();
  }
}

function createPlayer(){
  for( i = 0; i < 1; i++){

    mdx = speed;
    mdy = speed;

    playerObject.push(new Player(mx, my, mdx, mdy,  mradius, mradius))
  }
}

function init() {


  for (var i = evilObject.length; i < evil; i++) {
    var x = Math.floor(Math.random() * (canvas.width - 5 * 2) + 5)
    var y = Math.floor(Math.random() * (canvas.width - 5 * 2) + 5)
    var dx = (Math.random() - .5) * 4
    var dy = (Math.random() - .5) * 4
    if(x + 6 > playerObject[0].mx && x - 6 < playerObject[0].mx + 10.5 &&
      y + 6 > playerObject[0].my && y - 6 < playerObject[0].my + 10.5){
        x -= 10;
        y -= 10;
      }

    evilObject.push(new Evil(x, y, dx, dy));
    // console.log(evilObject.length)
  }
}

function animate() {
  if (anmt == true) {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight)

    for (i = 0; i < playerObject.length; i++){
      playerObject[i].updatePlayer()

    }

    for (i = 0; i < evilObject.length; i++) {
      evilObject[i].update()

      coin()
    }
  }
  else{
    cancelAnimationFrame(animate)
    console.log('hj')
  }
}

createPlayer()
animate()
init()
