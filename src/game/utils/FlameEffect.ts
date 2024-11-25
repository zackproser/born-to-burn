import * as Phaser from 'phaser';

export const createFlameEffect = (scene: Phaser.Scene, x: number, y: number) => {
    return scene.add.particles(x, y, 'flame', {
        color: [ 
            0xfacc22, // bright yellow
            0xf89800, // orange
            0xf83600, // red-orange
            0xff0000, // red
            0x0099ff, // light blue
            0x00ccff, // bright blue
            0xffffff  // white
        ],
        colorEase: 'quad.out',
        lifespan: { min: 400, max: 600 },
        angle: { min: -85, max: -95 },
        scale: { start: 0.6, end: 0, ease: 'cubic.out' },
        speed: { min: 50, max: 100 },
        advance: 2000,
        blendMode: 'ADD',
        frequency: 20,
        quantity: 2,
        reserve: 20,
        gravityY: -100,
        alpha: { start: 0.6, end: 0 },
        rotate: { min: -10, max: 10 },
        emitZone: {
            type: 'random',
            source: new Phaser.Geom.Circle(0, 0, 3),
            quantity: 12
        },
        // Add random movement to create flickering effect
        moveToX: {
            onEmit: () => {
                return x + Phaser.Math.Between(-5, 5);
            }
        },
        moveToY: {
            onEmit: () => {
                return y + Phaser.Math.Between(-5, 5);
            }
        }
    });
}; 