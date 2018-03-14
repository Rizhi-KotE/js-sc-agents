var path = require("path");
module.exports = {
    entry: {
        app: ["./index.js"],
        test: ["./test/index.spec.js"]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/assets/",
        filename: "[name].bundle.js",
        sourceMapFilename: "bundle.js.map"
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devServer: {
        proxy: [
            {
                context: ["/sctp", "/api", "/client", "/static"],
                target: "http://localhost:8000",
                secure: false,
                ws: true
            }
        ],
        contentBase: "./dist",
        inline: true,
        hot: true
    },
    module: {
        rules: [
            {test: /\.css$/, use: 'css-loader'},
            {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},
            {test: /\.jsx$/, use: 'babel-loader', exclude: /node_modules/}
        ]
    },
    devtool: "eval"
};
