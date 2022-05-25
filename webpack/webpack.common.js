const { resolve } = require('path')
const nodeExternals = require('webpack-node-externals')

const src = resolve(__dirname, '..', 'src')
module.exports = {
    entry: resolve(src, 'index.ts'),
    target: 'node',
    externals: [nodeExternals()],
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, '..', 'dist'),
    },
    stats: 'errors-only',
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@server': resolve(src, 'server'),
            '@config': resolve(src, 'config'),
            '@services': resolve(src, 'services'),
            '@database': resolve(src, 'database'),
            '@models': resolve(src, 'models'),
            '@interfaces': resolve(src, 'interfaces'),
            '@routes': resolve(src, 'routes'),
            '@middlewares': resolve(src, 'middlewares'),
            '@validate': resolve(src, 'validations'),
            '@helpers': resolve(src, 'helper'),
        },
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
        ],
    },
}
