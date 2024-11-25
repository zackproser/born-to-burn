import * as Phaser from 'phaser';
import Candlestick from '../objects/Candlestick';

export default class MainScene extends Phaser.Scene {
    private player!: Candlestick;
    private ground!: Phaser.GameObjects.Rectangle;
    private beams!: Phaser.GameObjects.Group;

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
    }

    create() {
        this.createGround();
        this.player = new Candlestick(this, 100, 450);
        this.createBeams();
        
        this.physics.add.collider(this.player, this.ground);
    }

    update() {
        this.player.update();
    }

    private createGround() {
        this.ground = this.add.rectangle(400, 580, 800, 40, 0x666666);
        this.physics.add.existing(this.ground, true);
    }

    private createBeams() {
        this.beams = this.add.group();
        // We'll add beam creation logic later
    }
} 