const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	mode: "development",
	entry: "./src/index.ts", // 入口配置项
	output: { // 出口配置项
		path: path.resolve(__dirname, "dist"),
		filename: "index.js",
		publicPath: "./",
		assetModuleFilename: "assets/[hash][ext][query]",
	},
	module: { // 添加模块依赖
		rules: [
			{
				test: /\.tsx?$/,
				use: ["ts-loader"],
			},
			{
				test: /\.(png|jpg|jpeg|gif|webp|svg|bmp|tiff)$/,
				type: "asset",
			},
			{
				test: /\.css$/,
				use: [
					"style-loader", "css-loader",
				],
			},
			{
				test: /\.scss$/,
				use: [
					"style-loader", "css-loader",
					{
						loader: "sass-loader",
						options: {
							sassOptions: {
								module: true,
								outputStyle: "expanded", // production 用 compressed
							},
						},
					},
				],
			},
		],
	},
	plugins: [ // 添加插件支持，注意plugins是一个数组
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			filename: "index.html",
			favicon: "./src/static/favicon.ico",
		}),
		new CleanWebpackPlugin(),
		new ReactRefreshPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: __dirname + "/src/static",
					to: __dirname + "/dist",
					// ignore: [".*"],
				},
			],
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
		extensions: [".ts", ".tsx", ".js", ".json", ".wasm"],
	},
	/* devServer: {
		// contentBase: path.resolve(__dirname, "dist"), // 服务启动根目录（除了main.js所在目录之外的静态服务目录）
		static: {
			directory: path.resolve(__dirname, "dist"),
		},
		compress: true, // 为每个静态文件开启 gzip compression
		open: false, // 是否自动打开浏览器，默认false不打开
		port: 8081, // 自定义服务端口，默认为8080
		hot: true, // 是否开启模块热更新，默认为false不开启
		proxy: { // 本地正向代理（常用于非同源请求）
			"/api": {
				target: "http://localhost:3000",
				pathRewrite: {
					"^/api": "",
				},
			},
		},
	}, */
};