var airplane, airplaneImg;
var bullet, bulletImg;
var monster, monsterImg;
var backgroundImg;

var score = 0;
var lives = 5;

var gameState = "play"

function preload() {
  airplaneImg = loadImage("images/airplane.png")
  bulletImg = loadImage("images/bullet.png")
  monsterImg = loadImage("images/monster.png")
  backgroundImg = loadImage("images/background.jpg")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  edgeLeft = createSprite(0,windowHeight/2,0,windowHeight)
  edgeLeft.visible = false
  
  edgeRight = createSprite(windowWidth,windowHeight/2,0,windowHeight)
  edgeRight.visible = false
  
  edgeTop = createSprite(windowWidth/2,0,windowWidth,0)
  edgeTop.visible = false
  
  edgeBottom = createSprite(windowWidth/2,windowHeight,windowWidth,0)
  edgeBottom.visible = false
    
  airplane = createSprite(windowWidth/2, windowHeight - 50)
  airplane.addImage(airplaneImg)
  airplane.scale = 0.4
  
  monster = createSprite(random(0,windowWidth),random(0,windowHeight))
  monster.addImage(monsterImg)
  monster.scale = 0.1
  monster.lifetime = 60
  
  bullet = createSprite(windowWidth+100,windowHeight+100)
  bullet.addImage(bulletImg)
  bullet.scale = 0.02
  bullet.velocityY = -10
  
}

function draw() {
  background(backgroundImg);
  textSize(20)
  fill("blue")
  text("score: " + score, windowWidth/40, windowHeight/18)
  text("lives: " + lives, windowWidth/40, windowHeight/10)
  
  if (gameState === "play") {
    
    airplane.visible = true
    monster.visible = true
    bullet.visible = true
    
    
    if (keyDown(LEFT_ARROW)) {
    airplane.x = airplane.x - 3;
  }
  
  if (keyDown(RIGHT_ARROW)) {
    airplane.x = airplane.x + 3;
  }
  
  if (keyDown(UP_ARROW)) {
    airplane.y = airplane.y - 3;
  }
  
  if (keyDown(DOWN_ARROW)) {
    airplane.y = airplane.y + 3;
  }
  
  
  
  if (keyDown("SPACE")) {
    if (frameCount % 60 === 0) {
    bullet = createSprite(airplane.x, airplane.y)
    bullet.addImage(bulletImg)
    bullet.scale = 0.02
    bullet.velocityY = -10
  }
  }
  
  
  
  if (frameCount % 60 === 0) {
    monster = createSprite(random(0,windowWidth),random(0,windowHeight))
    monster.addImage(monsterImg)
    monster.scale = 0.1
    monster.lifetime = 60
    
 }
  
  if (bullet.isTouching(monster)) {
    score = score + 1
    monster.destroy()
  }
  
  if (airplane.isTouching(monster)) {
    lives = lives - 1
    monster.destroy()
  }
    if (lives === 0) {
      gameState = "end"
    }
  }
  if (gameState === "end") {
    textSize(20)
    fill("red")
    text("Game Over!", (windowWidth/2) - 50, windowHeight/2 - 30)
    text("Press 'R' to play again!", windowWidth/2 - 75, windowHeight/2)
    airplane.visible = false
    monster.visible = false
    bullet.visible = false
  }
  
  if (keyDown("r") && gameState === "end") {
      gameState = "play"
      score = 0
      lives = 5
    }
  

  
  airplane.bounceOff(edgeLeft)
  airplane.bounceOff(edgeRight)
  airplane.bounceOff(edgeTop)
  airplane.bounceOff(edgeBottom)
  drawSprites()
}