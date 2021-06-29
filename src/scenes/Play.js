class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('star', './assets/star.png');
        this.load.image('sheep', './assets/sheep.png');
        this.load.image('sky', './assets/sky.png');
        this.load.image('mountains', './assets/mountains.png');
        this.load.image('mountains2', './assets/mountains2.png');
        this.load.image('clouds', './assets/clouds.png');
        this.load.image('scoreborder', './assets/score_border.png');
        this.load.image('gameborder', './assets/game_border.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        this.sky = this.add.tileSprite(0, 0, 640, 480, 'sky').setOrigin(0, 0);
        this.mountains2 = this.add.tileSprite(0, 0, 640, 480, 'mountains2').setOrigin(0, 0);
        this.mountains = this.add.tileSprite(0, 0, 640, 480, 'mountains').setOrigin(0, 0);
        this.clouds = this.add.tileSprite(0, 0, 640, 480, 'clouds').setOrigin(0, 0);

        this.scoreborder = this.add.tileSprite(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 'scoreborder').setOrigin(0, 0);
        this.gameborder = this.add.tileSprite(0, 0, game.config.width, borderUISize, 'gameborder').setOrigin(0, 0);
        this.gameborder = this.add.tileSprite(0, game.config.height - borderUISize, game.config.width, borderUISize, 'gameborder').setOrigin(0, 0);
        this.gameborder = this.add.tileSprite(0, 0, borderUISize, game.config.height, 'gameborder').setOrigin(0, 0);
        this.gameborder = this.add.tileSprite(game.config.width - borderUISize, 0, borderUISize, game.config.height, 'gameborder').setOrigin(0, 0);

        this.p1Star = new Star(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'star').setOrigin(0.5, 0);
        
        this.sheep01 = new Sheep(this, game.config.width + borderUISize*6, borderUISize*4, 'sheep', 0, 30).setOrigin(0, 0);
        this.sheep02 = new Sheep(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'sheep', 0, 20).setOrigin(0,0);
        this.sheep03 = new Sheep(this, game.config.width, borderUISize*6 + borderPadding*4, 'sheep', 0, 10).setOrigin(0,0);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        this.p1Score = 0;
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#aaade6',
            color: '#4f60bd',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 100
          }
          this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

          this.gameOver = false;
          scoreConfig.fixedWidth = 0;
          this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
              this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
              this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
              this.gameOver = true;
          }, null, this);
          
        }
    

    update() {
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.sky.tilePositionX -= 4;
        this.mountains.tilePositionX -= 1;
        this.mountains2.tilePositionX -= 0.75;
        this.clouds.tilePositionX -= 1;

        if(!this.gameOver) {
            this.p1Star.update();
            this.sheep01.update();
            this.sheep02.update();
            this.sheep03.update();
        }
        if(this.checkCollision(this.p1Star, this.sheep03)) {
            this.p1Star.reset();
            this.sheepExplode(this.sheep03);
          }
          if (this.checkCollision(this.p1Star, this.sheep02)) {
            this.p1Star.reset();
            this.sheepExplode(this.sheep02);
          }
          if (this.checkCollision(this.p1Star, this.sheep01)) {
            this.p1Star.reset();
            this.sheepExplode(this.sheep01);
          }
    }

    checkCollision(star, sheep) {
        if(star.x < sheep.x + sheep.width &&
            star.x + star.width > sheep.x &&
            star.y < sheep.y + sheep.height &&
            star.height + star.y > sheep.y) {
                return true;
            } else {
                return false;
            }
    }

    sheepExplode(sheep) {
        sheep.alpha = 0;
        let boom = this.add.sprite(sheep.x, sheep.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             
        boom.on('animationcomplete', () => {    
          sheep.reset();                        
          sheep.alpha = 1;                       
          boom.destroy();                       
        });   
        this.p1Score += sheep.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
      }
}