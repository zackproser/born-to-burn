import * as Phaser from 'phaser';
import { createFlameEffect } from '../utils/FlameEffect';

export class WoodenBeam extends Phaser.GameObjects.Container {
    public body!: Phaser.Physics.Arcade.StaticBody;
    private beam: Phaser.GameObjects.Rectangle;
    private isOnFire: boolean = false;
    private flame: Phaser.GameObjects.Particles.ParticleEmitter | null = null;
    private ignitionTimer: Phaser.Time.TimerEvent | null = null;
    
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        
        // Create a brown rectangle for the beam
        this.beam = scene.add.rectangle(0, 0, 120, 20, 0x8B4513);
        this.add(this.beam);
        
        // Enable physics with larger overlap area
        scene.physics.add.existing(this, true);
        (this.body as Phaser.Physics.Arcade.StaticBody).setSize(140, 40); // Larger collision area
        
        this.setDepth(1);
        scene.add.existing(this);
    }

    startIgnition() {
        if (this.isOnFire) return; // Remove ignitionTimer check to allow immediate ignition
        
        if (!this.ignitionTimer) {
            // Change color to indicate heating up
            this.scene.tweens.add({
                targets: this.beam,
                fillColor: 0xcd5c5c,
                duration: 500, // Faster color change
                ease: 'Linear'
            });
            
            this.ignitionTimer = this.scene.time.delayedCall(500, () => {
                this.ignite();
            });
        }
    }

    ignite() {
        if (this.isOnFire) return;
        
        this.isOnFire = true;
        // Make beam darker when fully ignited
        this.beam.setFillStyle(0x8b0000);
        
        // Create flame effect with similar colors to candlestick
        this.flame = createFlameEffect(this.scene, 0, -15, {
            color: [
                0xffffff, // White
                0xff4500, // Red-orange
                0xff8c00, // Dark orange
                0xffd700  // Gold/yellow
            ],
            scale: { start: 0.4, end: 0 },
            lifespan: 600,
            quantity: 2
        });
        this.add(this.flame);
    }

    cancelIgnition() {
        if (!this.isOnFire && this.ignitionTimer) {
            // Only cancel if not already ignited
            this.scene.tweens.add({
                targets: this.beam,
                fillColor: 0x8B4513,
                duration: 300,
                ease: 'Linear'
            });
            
            this.ignitionTimer.destroy();
            this.ignitionTimer = null;
        }
    }
} 