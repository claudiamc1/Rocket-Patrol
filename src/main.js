let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}
let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyF, keyR, keyLEFT, keyRIGHT;

/*Claudia McMillin, Sheep Patrol, 6.29.21, approx. 7 hours
Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)
Implement parallax scrolling (10)
Create 4 new explosion SFX and randomize which one plays on impact (10)
+ automatic 20 points from finishing tutorial

sources:
parallax scrolling: https://www.joshmorony.com/how-to-create-a-parallax-background-in-phaser/
randomize sfx: https://www.html5gamedevs.com/topic/37506-pick-random-element/
sfx: https://mixkit.co/free-sound-effects/game/, https://www.fesliyanstudios.com/royalty-free-sound-effects-download/lamb-sheep-260*/