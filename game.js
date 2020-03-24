gameState = {
  score: 0
};
function preload() {
  this.load.image("codey", "./Resources/codey.png");
  this.load.image("bomb", "./Resources/BombFailling.svg");
  this.load.image(
    "platform",
    "https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/platform.png"
  );
}

const style = {
  font: "16px Helvetica",
  fill: "#FFFFFF",
  padding: { x: 6, y: 7 }
};

function create() {
  gameState.codey = this.physics.add.sprite(250, 250, "codey").setScale(0.5);
  gameState.cursors = this.input.keyboard.createCursorKeys();
  this.add.text(175, 20, "Move with arrow keys", style);
  gameState.scoreText = this.add.text(220, 450, "Score: 0", {
    fontSize: "16px",
    fill: "#FFFFFF"
  });

  const platforms = this.physics.add.staticGroup();

  platforms.create(250, 510, "platform");

  const bombs = this.physics.add.group();
  this.physics.add.collider(gameState.codey, platforms);

  function bombGen() {
    const xCoord = Math.random() * 450;
    bombs.create(xCoord, 10, "bomb").setScale(0.3);
  }

  const bombGenLoop = this.time.addEvent({
    delay: 150,
    callback: bombGen,
    callbackScope: this,
    loop: true
  });

  // Add your code below:
  this.physics.add.collider(bombs, platforms, function(bombs) {
    bombs.destroy();
    gameState.score += 10;
    gameState.scoreText.setText(`Score: ${gameState.score}`);
  });

  this.physics.add.collider(gameState.codey, bombs, () => {
    bombGenLoop.destroy();
    this.physics.pause();
    this.add.text(200, 400, "Game Over", { fontSize: "20px", fill: "#FFFFFF" });
    this.add.text(175, 350, "Click to restart", {
      fontSize: "20px",
      fill: "#FFFFFF"
    });
    this.input.on("pointerup", () => {
      gameState.score = 0;
      this.scene.restart();
    });
  });
}

function update() {
  /*if (gameState.cursors.down.isDown) {
    gameState.codey.y += 3;
  }*/ if (
    gameState.cursors.up.isDown
  ) {
    gameState.codey.setVelocityY(-160);
  } else if (gameState.cursors.left.isDown) {
    gameState.codey.setVelocityX(-160);
  } else if (gameState.cursors.right.isDown) {
    gameState.codey.setVelocityX(160);
  } else if (gameState.codey.x >= 500 || gameState.codey.x <= 0) {
    gameState.codey.x = 250;
    gameState.codey.y = 250;
  } else if (gameState.codey.y >= 500 || gameState.codey.y <= 0) {
    gameState.codey.x = 250;
    gameState.codey.y = 250;
  }
}

const config = {
  width: 500,
  height: 500,
  backgroundColor: 0x000000,
  parent: "phaser-example",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      enableBody: true
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);
