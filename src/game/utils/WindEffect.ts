import * as Phaser from 'phaser';

interface WindConfig {
    y?: number;
    speed?: number;
    scale?: number;
    alpha?: number;
    tint?: number;
}

export function createWindEffect(
    scene: Phaser.Scene,
    config: WindConfig = {}
): Phaser.GameObjects.Particles.ParticleEmitter {
    const {
        y = 300,
        speed = 1,
        scale = 1,
        alpha = 0.3,
        tint = 0x87CEEB
    } = config;

    // Create a longer, more visible wind streak
    const windGraphics = scene.add.graphics();
    windGraphics.lineStyle(4, 0xffffff);
    windGraphics.beginPath();
    windGraphics.moveTo(0, 0);
    windGraphics.lineTo(100, 0); // Much longer line
    windGraphics.strokePath();
    windGraphics.generateTexture('wind-' + y, 100, 4);
    windGraphics.destroy();

    return scene.add.particles(0, y, 'wind-' + y, {
        scale: { start: 0.8 * scale, end: 0.2 * scale },
        alpha: { start: alpha, end: 0 },
        speed: 300 * speed,
        angle: { min: -2, max: 2 },
        frequency: 100,
        lifespan: 3000,
        blendMode: 'ADD',
        tint: tint,
        quantity: 2,
        rotate: { min: -2, max: 2 }, // Reduced rotation for more natural movement
        moveToX: scene.scale.width + 200,
        emitZone: {
            type: 'random',
            source: new Phaser.Geom.Line(-100, -10, -100, 10),
            quantity: 2,
            stepRate: 0
        }
    });
}

export function createLeaf(
    scene: Phaser.Scene,
    x: number,
    y: number
): Phaser.GameObjects.Particles.ParticleEmitter {
    return scene.add.particles(x, y, 'leaf', {
        scale: { start: 0.5, end: 0.3 },
        alpha: { start: 0.8, end: 0 },
        speed: { min: 100, max: 200 },
        angle: { min: -15, max: 15 },
        rotate: { min: -180, max: 180 },
        lifespan: 6000,
        frequency: 3000,
        quantity: 1,
        gravityY: 20,
        tint: [0x228B22, 0x8B4513, 0x556B2F], // Forest green, saddle brown, dark olive green
        moveToX: scene.scale.width + 100,
        emitZone: {
            type: 'random',
            source: new Phaser.Geom.Line(-100, -50, -100, 50),
            quantity: 1,
            stepRate: 0
        }
    });
} 