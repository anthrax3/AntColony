// TODO :
// Graphics :
// 0 - Draw the colony
// 1 - ant must head in the right direction
// 2 - Proper body circles (correct size)

// Ant :
// Is empty => No pheromons path created
// Is carrying => Pheromon creation (+8 on the path)
// If is Carrying, then, go home (approx heading to the colony)
// 
// Path :
// Store and render a pheromon path. All path must be kept (+8 points, every second, loose 1 point each second for instance).
// If one a track carrying => +8 again.
// 
// Render tracks : RGB value modified by pheromons qty


//get a reference to the canvas

$(document).ready(function(){
  var ctx = $('#canvas')[0].getContext("2d");
/*
  ctx.fillStyle = "#00A308";
  ctx.beginPath();
  ctx.arc(220, 220, 50, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#FF1C0A";
  ctx.beginPath();
  ctx.arc(100, 100, 100, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();

  //the rectangle is half transparent
  ctx.fillStyle = "rgba(255, 255, 0, .5)"
  ctx.beginPath();
  ctx.rect(15, 150, 120, 120);
  ctx.closePath();
  ctx.fill();
  */
//BEGIN LIBRARY CODE
  
  var NB_ANTS = 50; 
  
  var BALL_SIZE = 10;
  var HEAD_SIZE = 10;
  var TORSO_SIZE = 10;
  var MIDDLE_SIZE = 10;
  var ABDOMEN_SIZE = 10;
  
  var sophie;
  var ants = [];
  
  var antsColor = ["#445500", "#553300", "#332200"];
  var groundColor = "#081200";
  
  var WIDTH;
  var HEIGHT;
  var ctx;
  
  var ant = function() {
    this.x = Math.random() * WIDTH*0.90;
    this.y = Math.random() * HEIGHT*0.90;
    this.dx = Math.random() * 10;
    this.dy = Math.random() * 10;
    this.angle = 0;
    this.dAngle = 2.5;
    
    console.log((Math.floor(Math.random()*3)));
    
    this.color = antsColor[Math.floor((Math.random()*3))];
    console.log(this.color);
    
    this.draw = function () {
      ctx.save();
      ctx.translate( this.x, this.y );
      ctx.rotate(this.angle*Math.PI/180);
      ctx.translate( -this.x, -this.y );

      ctx.fillStyle = this.color;
      circle(this.x, this.y, HEAD_SIZE);
      circle(this.x+HEAD_SIZE, this.y, TORSO_SIZE);
      circle(this.x+HEAD_SIZE+TORSO_SIZE, this.y, MIDDLE_SIZE);
      circle(this.x+HEAD_SIZE+TORSO_SIZE+MIDDLE_SIZE, this.y, ABDOMEN_SIZE);
      
      this.angle += this.dAngle;
      
      ctx.restore();
     

    };
    
    this.update = function () {
      if (this.x + this.dx + BALL_SIZE > WIDTH || this.x + this.dx - BALL_SIZE < 0)
      {
        this.dx = -this.dx;
        this.dAngle = -this.dAngle;
      }
      if (this.y + this.dy + BALL_SIZE > HEIGHT || this.y + this.dy - BALL_SIZE < 0)
      {
        this.dy = -this.dy;
        this.dAngle = -this.dAngle;
      }
     
      this.x += this.dx;
      this.y += this.dy;
      this.angle += this.dAngle;
      
    };
  };
  
   
  function init() {
    ctx = $('#canvas')[0].getContext("2d");
    ctx.canvas.width  = window.innerWidth/2;
    ctx.canvas.height = window.innerHeight/2;
    WIDTH = $("#canvas").width();
    HEIGHT = $("#canvas").height();
    
    for ( var i = 0 ; i < NB_ANTS ; i++ ) {
      ants.push(new ant());
    }
    sophie = new ant();
    return setInterval(draw, 10);
    
  }
   
  function circle(x,y,r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
  }
   
  function rect(x,y,w,h) {
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fill();
  }
   
  function clear() {
    ctx.fillStyle = groundColor;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "#000000";
    //ctx.clearRect(0, 0, WIDTH, HEIGHT);
  }
  
  //END LIBRARY CODE
   
  function draw() {
  
    sophie.update();
    clear();
    sophie.draw();
    
    for ( var i = 0 ; i < ants.length ; i++ ) {
      ants[i].update();
      ants[i].draw();
    }
    
   
  }
   
  init();
  
});


