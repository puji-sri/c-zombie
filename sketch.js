var bg,bgImg;
var player, shooterImg, shooter_shooting,shootImg;
var zombieImg,zombieGroup,zombie;
var bulletGroup;
var heart1,heart1Img,heart2,heart2Img,heart3,heart3Img;
var PLAY =1;
var END =0;
var gameState = PLAY;
var score = 0;
var life = 3;



function preload(){
  
  shooterImg = loadImage("./assets/shooter_2.png");
  shooter_shooting = loadImage("./assets/shooter_3.png");
  shootImg = loadImage("./assets/shooter_1.png");
  bgImg = loadImage("./assets/bg.jpeg");
  zombieImg = loadImage("./assets/zombie.png");
  heart1Img = loadImage("./assets/heart_1.png");
  heart2Img = loadImage("./assets/heart_2.png");
  heart3Img = loadImage("./assets/heart_3.png");
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
 player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
  player.addImage(shooterImg);
   player.scale = 0.3;
   //player.debug = true
    player.debug = false;
    // player.Debug =false
    // Player.debug = true

   //player.Collider("rectagle",0,0,300,300)
   //player.setcollider("rectangle",0,0)
   player.setCollider("rectangle",0,0,300,300);
  // player.Setcollider("rectangle",0,0,300,300)

   heart1 = createSprite(displayWidth-90,40,20,20);
   heart1.addImage("heat1",heart1Img);
   heart1.scale = 0.2;
   heart1.visable = false;

   heart2 = createSprite(displayWidth-150,40,20,20);
   heart2.addImage("heart2",heart2Img);
   heart2.scale = 0.2;
   heart2.visable = false;
   
   heart3 = createSprite(displayWidth-250,40,20,20);
   heart3.addImage("heart3",heart3Img);
   heart3.scale = 0.2;
   
   
 
    zombieGroup = new Group();
    bulletGroup = new Group();

}


function draw() {
  background(0); 


if(gameState === PLAY){
  spawnZombies();
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
  spawnBullet();
}
if(keyWentUp("space")){
  player.addImage(shooterImg);
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyDown("space")){
  //player.addImage( shooter_shooting )
 // player.addImage()
 player.addImage(shooterImg);
 //player.addImage(shooter_1.png)
}
 bulletGroup.overlap(zombieGroup,function(collector,collected){
  collector.destroy();
  collected.destroy();
  score = score+1;
 }
 );
 if(life===3){
  heart3.visible = true
  heart1.visible = false
  heart2.visible = false
}
if(life===2){
  heart2.visible = true
  heart1.visible = false
  heart3.visible = false
}
if(life===1){
  heart1.visible = true
  heart3.visible = false
  heart2.visible = false
}

//go to gameState "lost" when 0 lives are remaining
if(life===0){
  heart1.visible = false
  heart3.visible = false
  heart2.visible = false
  gameState = END
}
}
else if ( gameState === END ){
   if(zombieGroup.isTouching(player)){
    bulletGroup.destroy();
    player.destroy();
   };

      zombie.velocityX = 0;
      player.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    zombieGroup.setLifetimeEach(-1);
    bulletGroup.setLifetimeEach(-1);
     
     zombieGroup.setVelocityXEach(0);
     bulletGroup.setVelocityXEach(0);
}



drawSprites();


stroke("white");
textSize(30)
 text("Score : "+score,50,450);
 textSize(100)
}

function reset(){
  gameState = PLAY ;

obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();

score = 0 ;

}

function spawnZombies(){
  if(frameCount % 60 === 0){
  //giving random x and y positions for zombie to appear
  zombie = createSprite(displayWidth - 200,displayHeight- 300,40,40)
   zombie.y =Math.round(random(350,500));
  zombie.addImage(zombieImg)
  zombie.scale = 0.15
  zombie.velocityX = -3
  zombie.debug= false
  zombie.setCollider("rectangle",0,0,600,600)

 
  
 
  zombie.lifetime = 350;
 zombieGroup.add(zombie)
  }
}

function spawnBullet(){
  bullet = createSprite(player.x+60,player.y-20,10,10);
  bullet.shapeColor="red";
  bullet.velocityX = 5
  bullet.lifetime = 350;
  bulletGroup.add(bullet);
}