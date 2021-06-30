class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload(){
        this.load.audio('sfx_select', './assets/select.wav');
        this.load.audio('sfx_explosion1', './assets/baa1.mp3');
        this.load.audio('sfx_explosion2', './assets/baa2.mp3');
        this.load.audio('sfx_explosion3', './assets/baa3.mp3');
        this.load.audio('sfx_explosion4', './assets/baa4.mp3');
        this.load.audio('sfx_star', './assets/star_fire.wav');
        this.load.image('title', './assets/title_screen.png');
    }

    create() {
        this.title = this.add.tileSprite(0, 0, 640, 480, 'title').setOrigin(0, 0);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings = {
                sheepSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings = {
                sheepSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}