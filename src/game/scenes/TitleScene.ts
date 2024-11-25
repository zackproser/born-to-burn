import * as Phaser from 'phaser';

export default class TitleScene extends Phaser.Scene {
    private titleText!: Phaser.GameObjects.Text;
    private candleLight!: Phaser.GameObjects.Particles.ParticleEmitter;
    private torches: Phaser.GameObjects.Particles.ParticleEmitter[] = [];
    private candleContainer!: Phaser.GameObjects.Container;

    constructor() {
        super({ key: 'TitleScene' });
    }

    preload() {
        // Create flame particle texture
        const graphics = this.add.graphics();
        graphics.fillStyle(0xffffff, 1);
        graphics.fillCircle(32, 32, 32);
        graphics.generateTexture('flame', 64, 64);
        graphics.destroy();

        // Create gradient background texture
        const gradientGraphics = this.add.graphics();
        for (let y = 0; y < 600; y++) {
            const color = Phaser.Display.Color.Interpolate.ColorWithColor(
                Phaser.Display.Color.ValueToColor(0x1a0f1f),
                Phaser.Display.Color.ValueToColor(0x0a0510),
                600,
                y
            );
            gradientGraphics.lineStyle(1, color.color, 1);
            gradientGraphics.lineBetween(0, y, 800, y);
        }
        gradientGraphics.generateTexture('gradient', 800, 600);
        gradientGraphics.destroy();
    }

    create() {
        // Add gradient background
        this.add.image(400, 300, 'gradient');

        // Add stone platform with better visuals
        const platform = this.add.graphics();
        platform.fillStyle(0x2a2a2a);
        platform.fillRect(300, 390, 200, 40);
        
        // Add platform details
        platform.lineStyle(2, 0x3a3a3a);
        platform.strokeRect(300, 390, 200, 40);

        // Add central candle and add it to the scene
        const candleBase = this.add.rectangle(400, 385, 20, 40, 0xd4d4d4)
            .setOrigin(0.5)
            .setDepth(1);
        
        const candleWick = this.add.rectangle(400, 363, 4, 8, 0x333333)
            .setOrigin(0.5)
            .setDepth(1);

        // Create container for candle parts to move them together
        this.candleContainer = this.add.container(0, 0, [candleBase, candleWick]);

        // Enhanced flame effect for the central candle
        this.candleLight = this.add.particles(400, 360, 'flame', {
            color: [ 0xffffff, 0xffd700, 0xff8c00, 0xff4500 ],
            colorEase: 'quad.out',
            lifespan: 800,
            angle: { min: -10, max: 10 },
            scale: { start: 0.3, end: 0 },
            speed: { min: 50, max: 100 },
            quantity: 2,
            frequency: 30,
            blendMode: 'ADD',
            alpha: { start: 0.8, end: 0 },
            emitting: true
        });

        // Add title text with enhanced glow effect
        this.titleText = this.add.text(400, 200, 'BORN TO BURN', {
            fontSize: '64px',
            fontFamily: 'Arial Black',
            color: '#ff4500',
        }).setOrigin(0.5);

        // Enhanced text glow
        this.titleText.setStroke('#ff8c00', 16);
        this.titleText.setShadow(0, 0, '#ff0000', 8, true, true);

        // Add pulsing glow effect to title
        this.tweens.add({
            targets: this.titleText,
            alpha: 0.8,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Add "Press SPACE to start" text
        const startText = this.add.text(400, 500, 'Press SPACE to start', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff',
        }).setOrigin(0.5);

        // Smoother blinking effect
        this.tweens.add({
            targets: startText,
            alpha: 0.2,
            duration: 1200,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Add space key handler
        this.input.keyboard?.addKey('SPACE').on('down', () => {
            this.scene.start('MainScene');
        });
    }

    update() {
        if (this.candleLight) {
            const time = this.time.now / 1000;
            const offsetX = Math.sin(time * 2) * 2;
            
            // Update both the flame and candle position
            this.candleLight.setPosition(400 + offsetX, 360);
            this.candleContainer.setPosition(offsetX, 0);
        }
    }
} 