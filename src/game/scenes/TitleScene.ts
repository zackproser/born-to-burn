import * as Phaser from 'phaser';
import { createWindEffect, createLeaf } from '../utils/WindEffect';
import { createFlameEffect } from '../utils/FlameEffect';

export default class TitleScene extends Phaser.Scene {
    private windEmitters: Phaser.GameObjects.Particles.ParticleEmitter[] = [];
    private leafEmitters: Phaser.GameObjects.Particles.ParticleEmitter[] = [];

    constructor() {
        super({ key: 'TitleScene' });
    }

    preload() {
        // This path is correct - it points to public/assets/borntoburnbg.png
        this.load.image('background', '/assets/borntoburnbg.png');

        // Create leaf texture using arc instead of ellipse
        const leafGraphics = this.add.graphics();
        leafGraphics.fillStyle(0xffffff);
        leafGraphics.beginPath();
        leafGraphics.moveTo(8, 0);
        leafGraphics.arc(8, 8, 8, -Math.PI/2, Math.PI/2, false);
        leafGraphics.lineTo(8, 0);
        leafGraphics.closePath();
        leafGraphics.fill();
        leafGraphics.generateTexture('leaf', 16, 16);
        leafGraphics.destroy();

        // Create flame particle
        const graphics = this.add.graphics();
        graphics.clear();
        graphics.fillStyle(0xffffff, 1);
        graphics.fillCircle(32, 32, 32);
        graphics.generateTexture('flame', 64, 64);
        graphics.destroy();
    }

    create() {
        // Replace the black rectangle with the background image
        this.add.image(400, 300, 'background');

        // Create pedestal and candlestick group
        const decorGroup = this.add.container(400, 0);
        
        decorGroup.add(this.add.rectangle(0, 500, 200, 40, 0x666666)); // pedestal
        decorGroup.add(this.add.rectangle(0, 450, 20, 40, 0xf4f4f4)); // candle body
        decorGroup.add(this.add.rectangle(0, 428, 4, 8, 0x333333)); // wick
        
        // Create strongly wind-blown flame effect
        createFlameEffect(this, 400, 424, {
            color: [
                0xffffff, // White
                0x00bfff, // Blue
                0x1e90ff, // Deeper blue
                0xff4500, // Red-orange
                0xff8c00, // Dark orange
                0xffd700  // Gold/yellow
            ],
            scale: { start: 0.35, end: 0 },
            lifespan: 600,
            quantity: 3,
            particleConfig: {
                speedX: { min: 250, max: 350 },    // Increased horizontal speed
                speedY: { min: -40, max: -60 },    // Reduced vertical movement
                gravityY: -50,                     // Reduced upward drift
                rotate: { min: -5, max: 5 },       // Reduced rotation for more horizontal look
                emitZone: {
                    type: 'random',
                    source: new Phaser.Geom.Circle(0, 0, 3), // Smaller emission zone
                    quantity: 1
                }
            }
        });

        // Add title text with shadow for better visibility
        this.add.text(400, 200, 'Born to Burn', {
            fontSize: '64px',
            fontFamily: 'Arial',
            color: '#ffffff',
            shadow: {
                color: '#000000',
                fill: true,
                offsetX: 2,
                offsetY: 2,
                blur: 8
            }
        }).setOrigin(0.5);

        // Add start text
        const startText = this.add.text(400, 300, 'Press SPACE to start', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff',
            shadow: {
                color: '#000000',
                fill: true,
                offsetX: 1,
                offsetY: 1,
                blur: 4
            }
        }).setOrigin(0.5);

        // Create multiple wind streams at different heights with increased visibility
        const windConfigs = [
            { y: 150, speed: 0.7, scale: 1.4, alpha: 0.4, tint: 0x87CEEB }, // Light blue, slow
            { y: 250, speed: 1.2, scale: 1.2, alpha: 0.5, tint: 0x4169E1 }, // Royal blue, medium
            { y: 350, speed: 0.9, scale: 1.3, alpha: 0.45, tint: 0x1E90FF }, // Dodger blue, normal
            { y: 450, speed: 1.5, scale: 1.1, alpha: 0.5, tint: 0x0000CD }  // Medium blue, fast
        ];

        // Create wind effects
        windConfigs.forEach(config => {
            this.windEmitters.push(createWindEffect(this, config));
        });

        // Create leaf spawners at different positions
        const leafPositions = [
            { x: -50, y: 100 },
            { x: -50, y: 300 },
            { x: -50, y: 500 }
        ];

        leafPositions.forEach(pos => {
            this.leafEmitters.push(createLeaf(this, pos.x, pos.y));
        });

        // Add hover effect to start text
        this.tweens.add({
            targets: startText,
            alpha: 0.5,
            duration: 1000,
            ease: 'Power1',
            yoyo: true,
            repeat: -1
        });

        // Handle space bar to start game
        this.input.keyboard?.addKey('SPACE').on('down', () => {
            this.scene.start('MainScene');
        });
    }
} 