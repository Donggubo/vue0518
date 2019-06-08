// webpack.development.config.js
const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const vueLoader = require("vue-loader");
module.exports = {
    mode: 'development',
    entry: path.join(__dirname, "./src/main.js"),//打包时入口文件
    output: {
        filename: "bundle.js",//输出名称
        path: path.join(__dirname, "./dist")//输出路径
    },
    devServer: {
        //contentBase: path.join(__dirname, "/src"),
        /*port:8080,
        host:'localhost',
        open: true,
        hot: true*/
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new vueLoader.VueLoaderPlugin(),
        new htmlWebpackPlugin({
            template: path.join(__dirname, "./src/index.html"),// 内存中模板来源
            filename: "index.html" // 要生成内存中的模板文件的名称
        })
    ],
    // 配置第三方模块加载器
    module: {
        rules: [
            // 处理css样式表
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            // 处理less样式表
            {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
            // 处理scss样式表
            {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
            // 处理图片
            {test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=11000&name=[hash:8][name].[ext]'},
            // 处理字体
            {test: /\.(eot|svg|ttf|woff|woff2)$/, use: 'url-loader'},
            // 处理js文件
            {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
            // 处理.vue文件
            {test: /\.vue$/, use: 'vue-loader'}
        ]
    },
    resolve: {
        alias: {
            // 修改vue被导入时的路径，配置后在main.js中即可import Vue from "vue";，
            // 如果不配置则需要填写完整路径import Vue from "../node_modules/dis/vue/vue.js";
            "vue$": "vue/dist/vue.js"
        }
    }
};