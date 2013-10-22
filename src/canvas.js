// TODO :
// Graphics :
// 0 - Draw the colony => DONE
// 1 - ant must head in the right direction => DONE
// 2 - Proper body circles (correct size) => Done

// 3 - Collision detection => Change direction if obstacle in front + test if obstacle == food.



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
  var NB_FOODS = 10;
  var NB_OBSTACLES = 10;
  
  var BLOCK_SIZE = 25;
  var BALL_SIZE = 2;
  var HEAD_SIZE = 2;
  var TORSO_SIZE = 2;
  var MIDDLE_SIZE = 2;
  var ABDOMEN_SIZE = 2;
  var FOOD_SIZE = 10;
  var ROCK_SIZE = 20;
  
  var ants = [];
  var foodReserves = [];
  var obstacles = [];
  
  var antsColor = ["#556622", "#775522", "#553311"];
  var groundColor = "#081200";
  
  var WIDTH;
  var HEIGHT;
  var ctx;
  
  var Colony = function() {
    this.x = Math.random() * WIDTH / 2;
    this.y = Math.random() * HEIGHT / 2;
    this.color = "#115511";
    
    this.draw = function () {
      ctx.save();

      ctx.fillStyle = this.color;
      circle(this.x, this.y, BLOCK_SIZE);
      circle(this.x+BLOCK_SIZE, this.y, BLOCK_SIZE);
      circle(this.x-BLOCK_SIZE, this.y, BLOCK_SIZE);
      circle(this.x, this.y - BLOCK_SIZE, BLOCK_SIZE);
      
      ctx.restore();
    };
  };
  
  var Ant = function() {
    this.x = Math.random() * WIDTH*0.90;
    this.y = Math.random() * HEIGHT*0.90;
    this.dx = Math.random() * 4 - 2;
    this.dy = Math.random() * 4 - 2;
    this.speed = Math.random() * 1 + 1;
    
    this.heading = Math.atan(this.dy / this.dx );
    
    this.color = antsColor[Math.floor((Math.random()*3))];
    
    this.draw = function () {
      ctx.save();
      ctx.translate( this.x, this.y );
      ctx.rotate(this.heading);
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
      
      // Border collision
      if (this.x + this.dx + BALL_SIZE > WIDTH || this.x + this.dx - BALL_SIZE < 0)
      {
        this.dx = -this.dx;
      }
      
      if (this.y + this.dy + BALL_SIZE > HEIGHT || this.y + this.dy - BALL_SIZE < 0)
      {
        this.dy = -this.dy;
      }
      
      // Ants Collision
      for (var i = 0 ; i < ants.length ; i++ ) {
        if ( this.x < ants[i].x && this.x + this.dx + BALL_SIZE > ants[i].x - BALL_SIZE ) {
          if ( this.y < ants[i].y && this.y + this.dy + BALL_SIZE > ants[i].y - BALL_SIZE ) {
            this.dx = this.dx -2; 
            this.dy = -this.dy; 
          }
        }
      }
        
      // Colony collision
      if ( (this.x + this.dx < colony.x && this.x + this.dx + BALL_SIZE > colony.x - BLOCK_SIZE*2) ||
           (this.x + this.dx > colony.x && this.x + this.dx - BALL_SIZE < colony.x + BLOCK_SIZE*2) ) {
        if ( this.y + this.dy < colony.y && this.y + this.dy + BALL_SIZE > colony.y - BLOCK_SIZE*2 ) {
          this.dx = -this.dx; 
          this.dy = -this.dy; 
        }
        else if ( this.y + this.dy > colony.y && this.y + this.dy - BALL_SIZE < colony.y + BLOCK_SIZE ) {
          this.dx = -this.dx; 
          this.dy = -this.dy; 
        }

      }
          
      // obstacles collision
      for ( var i = 0 ; i < obstacles.length ; i++ ) {
         
        if ( (this.x + this.dx < obstacles[i].x && this.x + this.dx + BALL_SIZE > obstacles[i].x - ROCK_SIZE) ||
             (this.x + this.dx > obstacles[i].x && this.x + this.dx - BALL_SIZE < obstacles[i].x + ROCK_SIZE) ) {
          if ( this.y + this.dy < obstacles[i].y && this.y + this.dy + BALL_SIZE > obstacles[i].y - ROCK_SIZE ) {
            this.dx = -this.dx; 
            this.dy = -this.dy; 
          }
          else if ( this.y + this.dy > obstacles[i].y && this.y + this.dy - BALL_SIZE < obstacles[i].y + ROCK_SIZE ) {
            this.dx = -this.dx; 
            this.dy = -this.dy; 
          }
  
        }
      }

      // Food collision
      for ( var i = 0 ; i < foodReserves.length ; i++ ) {
         
        if ( (this.x + this.dx < foodReserves[i].x && this.x + this.dx + BALL_SIZE > foodReserves[i].x - FOOD_SIZE) ||
             (this.x + this.dx > foodReserves[i].x && this.x + this.dx - BALL_SIZE < foodReserves[i].x + FOOD_SIZE) ) {
          if ( this.y + this.dy < foodReserves[i].y && this.y + this.dy + BALL_SIZE > foodReserves[i].y - FOOD_SIZE ) {
            this.dx = -this.dx; 
            this.dy = -this.dy; 
          }
          else if ( this.y + this.dy > foodReserves[i].y && this.y + this.dy - BALL_SIZE < foodReserves[i].y + FOOD_SIZE ) {
            this.dx = -this.dx; 
            this.dy = -this.dy; 
          }
  
        }
      }
      

      this.x += this.dx * this.speed;
      this.y += this.dy * this.speed;
      
      this.heading = Math.atan( this.dy / this.dx );
      
    };
  };
  
  var FoodReserve = function () {
    this.x = Math.random() * WIDTH * 0.85;
    this.y = Math.random() * HEIGHT * 0.85;
    this.color = "#CC3333";
    
    this.draw = function () {
      ctx.save();
      ctx.fillStyle = this.color;
      circle(this.x, this.y, FOOD_SIZE);
      ctx.restore();
    };
  };
  
  var Rock = function () {
    this.x = Math.random() * WIDTH * 0.85;
    this.y = Math.random() * HEIGHT * 0.85;
    this.color = "#BBBBBB";
    
    this.draw = function () {
      ctx.save();
      ctx.fillStyle = this.color;
      circle(this.x, this.y, ROCK_SIZE);
      ctx.restore();
    };
  };
   
  function init() {
    ctx = $('#canvas')[0].getContext("2d");
    ctx.canvas.width  = window.innerWidth/2;
    ctx.canvas.height = window.innerHeight/2;
    WIDTH = $("#canvas").width();
    HEIGHT = $("#canvas").height();
    
    for ( var i = 0 ; i < NB_ANTS ; i++ ) {
      ants.push(new Ant());
    }
    
    for ( var i = 0 ; i < NB_FOODS ; i++ ) {
      foodReserves.push(new FoodReserve());
    }

    for ( var i = 0 ; i < NB_OBSTACLES ; i++ ) {
      obstacles.push(new Rock());
    }
    colony = new Colony();
    
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
  
    clear();

    colony.draw();
    
    for ( var i = 0 ; i < ants.length ; i++ ) {
      ants[i].update();
      ants[i].draw();
    }
    
    for ( var i = 0 ; i < foodReserves.length ; i++ ) {
      foodReserves[i].draw();
    }

    for ( var i = 0 ; i < obstacles.length ; i++ ) {
      obstacles[i].draw();
    }
   
  }
   
  init();
  
});


