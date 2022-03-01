const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

/**
 * webpack 配置文件回调函数。
 * @param {boolean} isDev - true 表示开发环境，false 表示生产环境。
 * @returns 返回一个函数用于在 dev、prod 两个 webpack 配置文件中分别调用。
 */
module.exports.default = function (isDev) {
	return {
		mode: isDev ? "development" : "production",
		entry: "./src/index.ts", // 入口配置项
		output: { // 出口配置项
			path: path.resolve(__dirname, "dist"),
			filename: "index.js",
			publicPath: "./",
			assetModuleFilename: "assets/[hash][ext][query]",
		},
		externals: {
			"react": "React",
			"react-dom": "ReactDOM"
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
									outputStyle: isDev ? "expanded" : "compressed",
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
	};
}