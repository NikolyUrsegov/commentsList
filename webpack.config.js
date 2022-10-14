const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'front'),
        //clean: true,
    },
    devServer: {
        port: 3000,
        hot: false,
        open: true,
        proxy: {
            '/': {
                target: 'http://localhost:3000',
                router: () => 'http://localhost:8080',
                logLevel: 'debug' /*optional*/
            }
        }

    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline'
            },
            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './front/index.html'
        })
    ]
}