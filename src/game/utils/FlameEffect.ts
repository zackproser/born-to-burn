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
        color: 0xffffff,
        alpha: { start: 1, end: 0 },
        scale: { start: 0.4, end: 0 },
        blendMode: 'ADD',
        lifespan: 500,
        quantity: 1
    };

    const finalConfig = { ...defaultConfig, ...config };

    return scene.add.particles(x, y, 'flame', {
        color: Array.isArray(finalConfig.color) ? finalConfig.color : [finalConfig.color],
        alpha: finalConfig.alpha,
        scale: finalConfig.scale,
        blendMode: finalConfig.blendMode,
        lifespan: finalConfig.lifespan,
        frequency: 50,
        quantity: finalConfig.quantity,
        rotate: { min: -10, max: 10 },
        speedY: { min: -60, max: -80 },
        speedX: { min: -20, max: 20 }
    });
} 