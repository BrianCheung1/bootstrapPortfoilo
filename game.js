gameState = {
  score: 0
};

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
  scene: [StartScene,GameScene]
};

const game = new Phaser.Game(config);
