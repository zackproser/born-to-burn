import * as Phaser from 'phaser';
import { createFlameEffect } from '../utils/FlameEffect';

export default class Candlestick extends Phaser.GameObjects.Container {
    public body!: Phaser.Physics.Arcade.Body;
    private candleBody: Phaser.GameObjects.Rectangle;
    private flame: Phaser.GameObjects.Particles.ParticleEmitter;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        // Create candlestick body
        this.candleBody = scene.add.rectangle(0, 0, 20, 40, 0xf4f4f4);
        this.add(this.candleBody);

        // Add wick
        const wick = scene.add.rectangle(0, -22, 4, 8, 0x333333);
        this.add(wick);

        // Add flame effect (positioned at top of wick)
        this.flame = createFlameEffect(scene, 0, -26);
        this.add(this.flame);

        // Enable physics
        scene.physics.add.existing(this);
        this.body.setSize(20, 40);

        // Enable keyboard input for cursor keys
        scene.input.keyboard?.addCapture([
            Phaser.Input.Keyboard.KeyCodes.UP,
            Phaser.Input.Keyboard.KeyCodes.DOWN,
            Phaser.Input.Keyboard.KeyCodes.LEFT,
            Phaser.Input.Keyboard.KeyCodes.RIGHT
        ]);
        
        // Setup input
        this.cursors = scene.input.keyboard!.createCursorKeys();

        // Add to scene
        scene.add.existing(this);
    }

    update() {
        if (this.cursors.left.isDown) {
            this.body.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.body.setVelocityX(160);
        } else {
            this.body.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.body.touching.down) {
            this.body.setVelocityY(-330);
        }
    }
} 