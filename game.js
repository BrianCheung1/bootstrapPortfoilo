gameState = {};
function preload() {
  this.load.image(
    "codey",
    "https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/codey.png"
  );
}

const style = {
  font: "16px Helvetica",
  fill: "#000000",
  padding: { x: 6, y: 7 }
};

function create() {
  gameState.codey = this.add.sprite(250, 250, "codey");
  gameState.cursors = this.input.keyboard.createCursorKeys();
  this.add.text(175, 20, "Move with arrow keys", style);
}

function update() {
  if (gameState.cursors.down.isDown) {
    gameState.codey.y += 3;
  } else if (gameState.cursors.up.isDown) {
    gameState.codey.y -= 3;
  } else if (gameState.cursors.left.isDown) {
    gameState.codey.x -= 3;
  } else if (gameState.cursors.right.isDown) {
    gameState.codey.x += 3;
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
  backgroundColor: 0xdda0dd,
  parent: "phaser-example",
  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);
