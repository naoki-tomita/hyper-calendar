import { Configuration } from "webpack";
import * as path from "path";

const config: Configuration = {
  entry: "./src/scripts/index.tsx",
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist/js")
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
    ],
  }
};

export default config;