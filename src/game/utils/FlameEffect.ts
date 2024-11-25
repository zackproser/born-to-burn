import * as Phaser from 'phaser';

interface FlameConfig {
    color: number[];
    alpha?: { start: number; end: number };
    scale: { start: number; end: number };
    blendMode?: string;
    lifespan: number;
    quantity: number;
    particleConfig?: {
        speedX: { min: number; max: number };
        speedY: { min: number; max: number };
        gravityY: number;
        rotate: { min: number; max: number };
        emitZone: {
            type: string;
            source: Phaser.Geom.Circle;
            quantity: number;
        };
    };
}

export function createFlameEffect(
    scene: Phaser.Scene, 
    x: number, 
    y: number, 
    config: FlameConfig
): Phaser.GameObjects.Particles.ParticleEmitter {
    const defaultConfig = {
        color: [0xffa500, 0xff4500, 0xff8c00],
        alpha: { start: 0.8, end: 0 },
        scale: { start: 0.6, end: 0.1 },
        blendMode: 'ADD',
        lifespan: 2000,
        quantity: 2,
        particleConfig: {
            speedX: { min: -20, max: 20 },
            speedY: { min: -100, max: -150 },
            gravityY: -50,
            rotate: { min: -15, max: 15 },
            emitZone: {
                type: 'random',
                source: new Phaser.Geom.Circle(0, 0, 10),
                quantity: 1,
                stepRate: 0
            }
        }
    };

    const finalConfig = {
        ...defaultConfig,
        ...config,
        particleConfig: {
            ...defaultConfig.particleConfig,
            ...config.particleConfig
        }
    };

    return scene.add.particles(x, y, 'flame', {
        color: Array.isArray(finalConfig.color) ? finalConfig.color : [finalConfig.color],
        alpha: finalConfig.alpha,
        scale: finalConfig.scale,
        blendMode: finalConfig.blendMode,
        lifespan: finalConfig.lifespan,
        frequency: 30,
        quantity: finalConfig.quantity,
        ...finalConfig.particleConfig
    });
} 