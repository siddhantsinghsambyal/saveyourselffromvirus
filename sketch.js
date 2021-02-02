var PLAY=1
var END=0
var gameState=PLAY

var player,playerImg,player_duckImg,player_hitImg, player_jumpImg,player_wonImg;
var ground,groundImg,groundImg2,groundImg3,groundImg4,
groundImg5,groundImg6,groundImg7;
var redvirus,redvirusImg;
var Lgreenvirus,LgreenvirusImg;
var Dgreenvirus,DgreenvirusImg;
var bluevirus,bluevirusImg;
var invisibleGround;
var gameover;
var score,bluevirusGroup,DgreenvirusGroup,
LgreenvirusGroup,redvirusGroup,monstersGroup;
var gameover,gameoverImg;


function preload(){
playerImg=loadAnimation("IMG_20210123_150724.png",
"IMG_20210123_152719.png")
  player_duckImg=loadAnimation('alienPink_duck.png')
  groundImg=loadImage("background_landscape07.png")
  redvirusImg=loadImage('virus03_04.png')
  LgreenvirusImg=loadImage('virus03_03.png')
  DgreenvirusImg=loadImage("virus03_02.png")
  bluevirusImg=loadImage('gameplaywacky_04.png')
  groundImg2=loadImage('background_landscape05.png')
  player_hitImg=loadImage("alienPink_hit.png")
  groundImg3=loadImage('background_landscape03.png')
  groundImg4=loadImage('background_landscape01.png')
   groundImg5=loadImage('background_landscape04.png')
  groundImg6=loadImage('download.png')
   groundImg7=loadImage('abstract_21.png')
  player_jumpImg=loadImage('alienPink_jump.png')
  player_wonImg=loadAnimation('alienPink_climb.png', 'alienPink_climb 1.png')
  gameoverImg=loadImage('gameover.png')
}

function setup() {
  createCanvas(windowWidth,windowHeight)
  
  ground=createSprite(width/2,-170,20,20);
  ground.addImage("back",groundImg)
  ground.addImage('background',groundImg2)
  ground.addImage('level3',groundImg3)
  ground.addImage('level4',groundImg4)
  ground.addImage('level5',groundImg5)
  ground.addImage('level6',groundImg6)
  ground.addImage('won',groundImg7)
  ground.scale=3.5
  ground.velocityX=-2
  
  invisibleGround=createSprite(250,490,500,10)
  invisibleGround.visible=false
  
 player=createSprite(40,430,20,20)
  player.addAnimation("playerRunning",playerImg)
  player.addAnimation("ducked",player_duckImg)
  player.addAnimation("lost",player_hitImg)
  player.addImage("jump",player_jumpImg)
  player.addAnimation("win",player_wonImg)
  
  score=0;
  
  bluevirusGroup=new Group();
  DgreenvirusGroup=new Group();
  LgreenvirusGroup=new Group();
  redvirusGroup=new Group();
}

function draw() {
 //background("blue")
  if(gameState===PLAY){

  if(ground.x<0){
    ground.x=height/2
  }
  
  if(keyDown('space') && player.y>=300){
   player.velocityY=-5
   player.changeImage('jump',player_jumpImg) 
  }
    
      if(keyDown('space') && player.y>=300){
   player.velocityY=-5
  }
    
    if(keyWentUp("space")){
   player.changeAnimation('playerRunning',playerImg)
           }
    
 player.velocityY=player.velocityY+0.3
  
  if(keyDown("DOWN_ARROW")){
   player.changeAnimation('ducked',player_duckImg) 
  }
    if(keyWentUp("DOWN_ARROW")){
   player.changeAnimation('playerRunning',playerImg)
           }
  
  score=score+Math.round(getFrameRate()/60)
  
  bluevirus();
    Dgreenvirus();
    Lgreenvirus();
    redvirus();
    
    
  if(score===1000){
    ground.changeImage("background",groundImg2)
    ground.y=65
    
  }  
    
  if(score===3000){
    ground.changeImage('level3',groundImg3)
    ground.y=200
  }  
    
    if(score===6000){
 ground.changeImage('level4',groundImg4)
      ground.scale=2.4
  ground.y=200    
    }
    
    if(score===12000){
     ground.changeImage('level5',groundImg5) 
      ground.scale=2.45
      ground.y=115
    }
    
    if(score===24000){
      ground.changeImage('level6',groundImg6) 
      ground.scale=2.45
      ground.y=115
    }
    
   if(bluevirusGroup.isTouching(player)){
     gameState=END;
    player.changeAnimation("lost",player_hitImg)
     bluevirusGroup.velocity=0;
  fill('black')
    textSize(50)
  text('YOU LOST',80,250)
   }
    
       if(DgreenvirusGroup.isTouching(player)){
     gameState=END;
player.changeAnimation("lost",player_hitImg)
     DgreenvirusGroup.velocity=0;
  fill('black')
    textSize(50)
  text('YOU LOST',80,250)
}
    
       if(LgreenvirusGroup.isTouching(player)){
     gameState=END;
     player.changeAnimation("lost",player_hitImg)
    LgreenvirusGroup.velocity=0;
           fill('black')
    textSize(50)
  text('YOU LOST',80,250)
   }
    
       if(redvirusGroup.isTouching(player)){
     gameState=END;
   player.changeAnimation("lost",player_hitImg)
     redvirusGroup.velocity=0;
           fill('black')
    textSize(50)
  text('YOU LOST',80,250)
   }
    
      
  }else if(gameState===END){
    player.velocityY=4
  player.scale=0.65
    ground.velocityX=0;
    gameover=createSprite(250,250,20,20)
    gameover.addImage("loose",gameoverImg)
  }
  
  player.collide(invisibleGround)
 
  drawSprites();
  
  if(score===36000){
    gameState=END
    fill('gold')
    textSize(50)
  text('YOU W0N',80,250)
    player.changeAnimation("win",player_wonImg)
    player.scale=2.5
    ground.changeImage('won',groundImg7)
    ground.scale=1.8
    ground.y=200
    ground.x=260
    bluevirusGroup.velocityX=0;
  DgreenvirusGroup.velocityX=0;
  LgreenvirusGroup.velocityX=0;
  redvirusGroup.velocityX=0;
  ground.velocityX=0;  

  }
  
  fill('255')
  text('Score: '+score,400,50)
}

function bluevirus(){
 if(frameCount %80===0){
  var virus=createSprite(400,465,10,40)
   virus.velocityX=-(6+3*score/1000)
   
 var rand=Math.round(random(1,1));
   switch(rand){
     case 1: virus.addImage(bluevirusImg)
       virus.scale=0.2
       break;
   }
   virus.y=Math.round(random(50,width-50))
   player.depth=virus.depth
   player.depth+=1
   bluevirusGroup.add(virus)
 }
}

function Dgreenvirus(){
if(score>=1000){
if(frameCount %50===0){
    var virus=createSprite(300,365,10,40)
   virus.velocityX=-(9+3*score/1000)
   
 var rand=Math.round(random(1,1));
   switch(rand){
     case 1: virus.addImage(DgreenvirusImg)
       virus.scale=0.2
       break;
   }
   virus.y=Math.round(random(50,width-50))
   player.depth=virus.depth
   player.depth+=1
   DgreenvirusGroup.add(virus) 
  
}
  }
}

function Lgreenvirus(){
if(score>=3000){
if(frameCount %90===0){
    var virus=createSprite(200,465,10,40)
   virus.velocityX=-(12+3*score/1000)
   
 var rand=Math.round(random(1,1));
   switch(rand){
     case 1: virus.addImage(LgreenvirusImg)
       virus.scale=0.2
       break;
   }
   virus.y=Math.round(random(50,width-50))
   player.depth=virus.depth
   player.depth+=1
   LgreenvirusGroup.add(virus) 
  
}
  }
}

function redvirus(){
if(score>=6000){
if(frameCount %80===0){
    var virus=createSprite(400,465,10,40)
   virus.velocityX=-(15+3*score/1000)
   
 var rand=Math.round(random(1,1));
   switch(rand){
     case 1: virus.addImage(redvirusImg)
       virus.scale=0.2
       break;
   }
   virus.y=Math.round(random(50,width-50))
   player.depth=virus.depth
   player.depth+=1
   redvirusGroup.add(virus) 
  
}
  }
}

