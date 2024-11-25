'use client';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const Game = () => {
    const gameRef = useRef<any>(null);

    useEffect(() => {
        // Make sure we're in the browser
        if (typeof window === 'undefined') {
            return;
        }

        // Dynamically import Phaser and MainScene
        const initPhaser = async () => {
            const Phaser = await import('phaser');
            const { default: MainScene } = await import('@/game/scenes/MainScene');

            const config = {
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 300 },
                        debug: false
                    }
                },
                scene: MainScene,
                parent: 'game-container'
            };

            if (!gameRef.current) {
                gameRef.current = new Phaser.Game(config);
            }
        };

        initPhaser();

        return () => {
            if (gameRef.current) {
                gameRef.current.destroy(true);
                gameRef.current = null;
            }
        };
    }, []);

    return <div id="game-container" />;
};

export default dynamic(() => Promise.resolve(Game), {
    ssr: false
}); 