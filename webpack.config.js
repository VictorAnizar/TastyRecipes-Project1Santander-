const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') 

module.exports = {
    entry: './src/js/index.js',//lee el archivo js
    output: {
        path: path.resolve(__dirname, 'dist'),//construye esta carpeta 
        filename: 'bundle.js',//arcchivo empaquetado
        assetModuleFilename: 'assets/[hash][ext][query]'
    }, 
    plugins: [ //se usa un plugin para leer html
        new HtmlWebpackPlugin({
            filename: 'index.html',//toma este archivo 
            template: './src/index.html'//y genera un archivo al final
        })
    ],
    module:{
        rules:[
            {
                test: /\.s[ac]ss$/i,//cuando pasa la prueba
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                  ]//usa estos loaders
            },
            {
                test: /\.svg/,
                use: {
                  loader: "svg-url-loader",
                  options: {},
                },
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [ "file-loader" ]
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    },
    
}