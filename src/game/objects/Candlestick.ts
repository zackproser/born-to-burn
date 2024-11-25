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

        // Add flame effect with narrower width and richer colors
        this.flame = createFlameEffect(scene, 0, -26, {
            color: [
                0xffffff, // White
                0x00bfff, // Blue
                0x1e90ff, // Deeper blue
                0xff4500, // Red-orange
                0xff8c00, // Dark orange
                0xffd700  // Gold/yellow
            ],
            alpha: { start: 1, end: 0 },
            scale: { start: 0.35, end: 0 }, // Reduced from 0.5 to 0.35
            blendMode: 'ADD',
            lifespan: 600,
            quantity: 2,
        });
        this.add(this.flame);

        // Enable physics
        scene.physics.add.existing(this);
        (this.body as Phaser.Physics.Arcade.Body).setSize(20, 40);

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

        // Set the candlestick's depth to be in front of the beams
        this.setDepth(2);

        // After enabling physics, set drag and other physics properties
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setSize(20, 40);
        body.setDrag(1000, 0); // Adds horizontal drag for better control
        body.setMaxVelocity(300, 600); // Limit max speeds
    }

    update() {
        const body = this.body as Phaser.Physics.Arcade.Body;
        
        if (this.cursors.left.isDown) {
            body.setVelocityX(-200);
        } else if (this.cursors.right.isDown) {
            body.setVelocityX(200);
        } else {
            body.setVelocityX(0);
        }

        if (this.cursors.up.isDown && body.touching.down) {
            body.setVelocityY(-500); // Adjusted jump strength (between -400 and -600)
        }
    }
} 