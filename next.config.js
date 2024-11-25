/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.js$/,
            include: /node_modules\/phaser/,
            type: 'javascript/auto'
        });
        return config;
    }
};

module.exports = nextConfig; 