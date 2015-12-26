"use strict";

const connect = require("connect");
const fs = require("fs");
const http = require("http");
const MemoryFS = require("memory-fs");
const webpack = require("webpack");

const app = connect();
const memoryFs = new MemoryFS();

app.use(function(req, res) {
    const path = req.url;

    if (!fs.existsSync("." + path)) {
        return res.end(`No module found at ${path}`);
    }

    const compiler = webpack({
        entry: "./entry.js",
        output: {
            path: "/",
            filename: "bundle.js",
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    loader: "babel-loader",
                    exclude: /node_modules/,
                    query: {
                        presets: ["es2015", "react"],
                    },
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                REQUIRE_PATH: JSON.stringify("." + path),
            }),
        ],
    });
    compiler.outputFileSystem = memoryFs;

    compiler.run(function(err, stats) {
        if (err) {
            return res.end(err.stack);
        }

        const fileContent = memoryFs.readFileSync("/bundle.js");

        res.end(`
            <div id="main"></div>
            <script>${fileContent}</script>
        `);
    });
});

const port = process.env.PORT || 3000;
console.log(`Server listening on port ${port}`);
http.createServer(app).listen(port);
