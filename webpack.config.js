var path = require("path");
module.exports = {
    entry: {
        app: ["./index.js"],
        test: ["./integration_test/index.js"]
    },
    output: {
        library: "ScAgentRegistry",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/assets/",
        filename: "[name].bundle.js",
        sourceMapFilename: "[name].bundle.map.js"
    },
    externals: ['utils'],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {test: /\.css$/, use: 'css-loader'},
            {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
            {test: /\.jsx$/, use: 'babel-loader', exclude: /node_modules/}
        ]
    },
    devtool: "inline-source-map"
};
