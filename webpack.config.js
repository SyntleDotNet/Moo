const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { env, argv } = require("process");

let config = {
    mode: "development",
    entry: {
        main: "./src/main.ts",
        "service-worker": "./src/service-worker.ts",
    },
    devServer: {
        https: false,
        port: 8080,
        static: path.resolve(__dirname, "dist"),
        open: true,
        // hot: true,
        watchFiles: ['src/**/*'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            // {
            //     test: /\.html$/,
            //     loader: "html-loader",
            // },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output. Both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/html", to: "" },
                { from: "resources/output", to: "" },
            ],
        }),
        // new HtmlWebPackPlugin({
        //     template: "./src/html/index.html",
        //     filename: "./index.html",
        // }),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
    output: {
        clean: true,
    },
};

module.exports = (env, argv) => {
    if (argv.mode !== "production") {
        config.devtool = "inline-source-map";
    }

    return config;
};
