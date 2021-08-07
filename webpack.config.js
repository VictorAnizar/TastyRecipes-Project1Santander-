const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') 

module.exports = {
    entry: './src/js/index.js',//lee el archivo js
    output: {
        path: path.resolve(__dirname, 'dist'),//construye esta carpeta 
        filename: 'bundle.js',//arcchivo empaquetado
        assetModuleFilename: 'images/[hash][ext][query]'
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
                test: /\.css$/,//cuando pasa la prueba
                use: ['style-loader', 'css-loader']//usa estos loaders
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
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192,
                    }
                  },
                ],
               type: 'javascript/auto'
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    },
    
}