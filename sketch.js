var trex, ground, invisGround, trexIMG, groundIMG, trexColliderIMG, cloudsGroup, cloudsIMG, ob1, ob2, ob3, ob4, ob5, ob6, obIMG, obGroup, score, gameState, play, end, gameOver, restart, gameOverIMG, restartIMG

end = 0;
play = 1;
gameState=play;

function preload() {
  trexIMG = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundIMG = loadImage("ground2.png");
  trexColliderIMG = loadImage("trex_collided.png");
  cloudsIMG = loadImage("cloud.png");
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");

  restartIMG = loadImage("restart.png");
  gameOverIMG = loadImage("gameOver.png");
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50, 170, 10, 10);
  trex.addAnimation("running", trexIMG);
  trex.addAnimation("collided", trexColliderIMG);
  trex.scale = 0.5;

  ground = createSprite(300, 180, 10, 10);
  ground.addImage(groundIMG);
  ground.x = ground.width / 2;


  invisGround = createSprite(300, 195, 600, 10);
  invisGround.visible = false;
  ground.velocityX = -6;

  cloudsGroup = new Group();
  obGroup = new Group();

  score = 0;

  gameOver = createSprite(300, 100);
  restart = createSprite(300, 140);
  gameOver.addImage(gameOverIMG);
  gameOver.scale = 0.5;
  restart.addImage(restartIMG);
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

}


function draw() {
  background(255);

  if (gameState === play) {


    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    trex.velocityY += 0.8;


    if (keyDown("space") && trex.y >= 166) {

      trex.velocityY = -10;
    }

    score = score + Math.round(getFrameRate() / 60);

    if (obGroup.isTouching(trex)) {
      gameState = end;
    }

    spawnObstacle();
    spawnClouds();

  } else if (gameState === end) {
    gameOver.visible = true;
    restart.visible = true;

    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);

    //change the trex animation
    trex.changeAnimation("collided",trexColliderIMG);

    //set lifetime of the game objects so that they are never destroyed
    obGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);


  }

  if (mousePressedOver(restart)) {
    reset();
  }


  trex.collide(invisGround);


  text("Score=" + score, 530, 30);


  drawSprites();
}

function reset() {
  gameState = play;

  gameOver.visible = false;
  restart.visible = false;

  obGroup.destroyEach();
  cloudsGroup.destroyEach();

  trex.changeAnimation("running", trexIMG);

  score = 0;

  ground.velocityX = -6;
}

function spawnClouds() {

  if (frameCount % 60 === 0) {
    var cloud = createSprite(600, 120, 10, 10);
    cloud.y = Math.round(random(80, 120));
    cloud.addImage(cloudsIMG);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

    //assign lifetime to the variable
    lifetime = 200;

    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    cloudsGroup.add(cloud);
  }


}

function spawnObstacle() {

  if (frameCount % 60 === 0) {
    var obstacles = createSprite(600, 165, 10, 10);
    obstacles.addImage(ob1);
    obstacles.scale = 0.5;
    obstacles.velocityX = -6;

    //assign lifetime to the variable
    lifetime = 100;



    var rand = Math.round(random(1, 6));



    switch (rand) {
      case 1:
        obstacles.addImage(ob1);
        break;

      case 2:
        obstacles.addImage(ob2);
        break;
      case 3:
        obstacles.addImage(ob3);
        break;
      case 4:
        obstacles.addImage(ob4);
        break;
      case 5:
        obstacles.addImage(ob5);
        break;
      case 6:
        obstacles.addImage(ob6);
        break;

    }

    obGroup.add(obstacles)

  }


}