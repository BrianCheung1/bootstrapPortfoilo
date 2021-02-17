class StartScene extends Phaser.Scene{
    constructor() {
      super({ key: 'StartScene' })
    }
    create() {
      this.add.text(125, 250, 'Click to Start!', { fontSize: '30px', fill: '#FFFFFF' })
      this.input.on('pointerup', () => {
        // Add your code below:
        this.scene.stop('StartScene')
        this.scene.start('GameScene')
      })
    }
  }