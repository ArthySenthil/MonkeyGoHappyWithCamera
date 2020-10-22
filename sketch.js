var backImage,backgr;
var player, player_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gameOver;
var score=0;
var distance;


function preload(){
  backImage=loadImage("jungle2.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  

  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(displayWidth , displayHeight-120);
  
  // backgr=createSprite(0,0,displayWidth*4,displayHeight);
  // backgr.addImage(backImage);
  // backgr.scale=2;

  // backgr.x=backgr.width/2;
  //backgr.velocityX=-4;
  
  player = createSprite(25,displayHeight-20,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.15;
     
  ground = createSprite(400,displayHeight/2,displayWidth*4,displayHeight-170);
  //ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  distance =0;
}

function draw() {
  
  background(119,80,64);
  // image(backImage, -displayWidth*2,displayHeight/2,displayWidth*5, displayHeight-100);
  camera.position.x=player.x;
  camera.position.y=displayHeight;

    player.x = player.x+5;
   // player.y=displayHeight-20;
   
   distance+=5;

   if(player.x>displayWidth*2){
     player.x=50;
    
   }
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  // if(backgr.x<100){
  //   backgr.x=backgr.width/2;
  // }
  
    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.14;
                break;
        case 30: player.scale=0.16;
                break;
        case 40: player.scale=0.18;
                break;
        default: break;
    }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
    
    if (player.y>displayHeight-10){
      player.y=displayHeight-10;
    }
  
   
    if(obstaclesGroup.isTouching(player)){ 
        player.scale=0.08;
        player.y=displayHeight-10;
     // score=score-2;
    }
    // player.collide(ground);
    spawnFood();
    spawnObstacles();
    image(backImage, -displayWidth*2,displayHeight/2,displayWidth*5, displayHeight-170);
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, camera.position.x+500,camera.position.y-220);
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(displayWidth,displayHeight-200,40,10);
    banana.y = random(displayHeight-100,displayHeight-200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
   banana.lifetime = displayWidth/5;
   player.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(displayWidth,displayHeight,10,40);
    obstacle.velocityX = -4;
    obstacle.addImage(obstacle_img);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;  
    obstacle.lifetime = displayWidth/4;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


  
