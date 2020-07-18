module.exports = {
	mode: "development",
	entry: {
		HalfEdge: "./src/index.ts",
	},
	output: {
		path: `${__dirname}/dist`,
		filename: "[name].js"
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				enforce: 'pre',
				exclude: /node_modules/,
				loader: 'eslint-loader',
				options: {
					fix: true
				}
			},
			{
				test: /\.ts$/,
				loader: "ts-loader"
			}
		]
	},
	resolve: {
		extensions: [".ts", ".js"]
	}
};
