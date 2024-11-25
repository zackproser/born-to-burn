import * as Phaser from 'phaser';

interface FlameConfig {
    color?: number | number[];
    alpha?: { start: number; end: number };
    scale?: { start: number; end: number };
    blendMode?: string;
    lifespan?: number;
    quantity?: number;
}

export function createFlameEffect(
    scene: Phaser.Scene, 
    x: number, 
    y: number, 
    config: FlameConfig = {}
): Phaser.GameObjects.Particles.ParticleEmitter {
    const defaultConfig = {
        color: [0xffa500, 0xff4500, 0xff8c00],
        alpha: { start: 0.8, end: 0 },
        scale: { start: 0.6, end: 0.1 },
        blendMode: 'ADD',
        lifespan: 2000,
        quantity: 2
    };

    const finalConfig = { ...defaultConfig, ...config };

    return scene.add.particles(x, y, 'flame', {
        color: Array.isArray(finalConfig.color) ? finalConfig.color : [finalConfig.color],
        alpha: finalConfig.alpha,
        scale: finalConfig.scale,
        blendMode: finalConfig.blendMode,
        lifespan: finalConfig.lifespan,
        frequency: 30,
        quantity: finalConfig.quantity,
        rotate: { min: -15, max: 15 },
        speedY: { min: -100, max: -150 },
        speedX: { min: -20, max: 20 },
        gravityY: -50,
        tint: { min: 0xff0000, max: 0xffff00 },
        emitZone: {
            type: 'random',
            source: new Phaser.Geom.Circle(0, 0, 10),
            quantity: 1,
            stepRate: 0
        }
    });
} 