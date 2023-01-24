const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader","css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader","css-loader","sass-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/views/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'about.html',
            template: './src/views/about.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'contacts.html',
            template: './src/views/contacts.html'
        })
    ],
};