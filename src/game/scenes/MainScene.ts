import * as Phaser from 'phaser';
import Candlestick from '../objects/Candlestick';
import { WoodenBeam } from '../objects/WoodenBeam';

export default class MainScene extends Phaser.Scene {
    private player!: Candlestick;
    private ground!: Phaser.GameObjects.Rectangle;
    private beams: WoodenBeam[] = [];

    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        // Create a circular gradient texture for the flame particle
        const graphics = this.add.graphics();
        
        // Draw a white circle that fades out from center
        graphics.clear();
        graphics.fillStyle(0xffffff, 1);
        graphics.fillCircle(32, 32, 32);
        
        // Generate the texture
        graphics.generateTexture('flame', 64, 64);
        graphics.destroy();

        this.load.image('wooden-beam', '/assets/wooden-beam.png');
    }

    create() {
        // Set world gravity to be stronger
        this.physics.world.gravity.y = 800; // Default is 600

        this.createGround();
        this.player = new Candlestick(this, 100, 450);
        
        // Add wooden beams at varied heights
        const beamPositions = [
            // Ground level beams
            { x: 200, y: 520 },
            // Mid-level beams
            { x: 400, y: 380 },
            { x: 600, y: 320 },
            // High beams
            { x: 300, y: 200 },
            { x: 500, y: 150 },
            // Add a few more for variety
            { x: 700, y: 250 },
            { x: 150, y: 300 },
        ];

        this.beams = beamPositions.map(pos => 
            new WoodenBeam(this, pos.x, pos.y)
        );
        
        // Add colliders
        this.physics.add.collider(this.player, this.ground);
        this.beams.forEach(beam => {
            this.physics.add.collider(this.player, beam);
        });
    }

    update() {
        this.player.update();

        // Check for collisions between candlestick and beams
        this.beams.forEach(beam => {
            // Use a larger overlap area for better detection
            const overlap = this.physics.overlap(
                this.player,
                beam,
                undefined,
                (player, beam) => {
                    // Custom check to ensure meaningful overlap
                    const distance = Phaser.Math.Distance.Between(
                        (player as Phaser.GameObjects.Sprite).x,
                        (player as Phaser.GameObjects.Sprite).y,
                        (beam as Phaser.GameObjects.Sprite).x,
                        (beam as Phaser.GameObjects.Sprite).y
                    );
                    return distance < 60; // Adjust this value as needed
                }
            );

            if (overlap) {
                beam.startIgnition();
            } else {
                beam.cancelIgnition();
            }
        });
    }

    private createGround() {
        this.ground = this.add.rectangle(400, 580, 800, 40, 0x666666);
        this.physics.add.existing(this.ground, true);
    }
} 