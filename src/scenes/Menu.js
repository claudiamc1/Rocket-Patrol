class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload(){
        this.load.audio('sfx_select', './assets/blip_select.wav');
        this.load.audio('sfx_explosion', './assets/explosion.wav');
        //this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
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