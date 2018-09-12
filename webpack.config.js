var path = require("path");
var webpack = require("webpack");
var node_modules_dir = path.resolve(__dirname, "node_modules");
var devtool = "eval-source-map"; //["eval-source-map"]
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
console.log(process.env.arg);
console.log(process.env.NODE_ENV);
var plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    names: ["vendors"], //"app"
    minChunks: Infinity
  })
];
if (process.env.arg === "p" || process.env.NODE_ENV === "p") {
  devtool = false;
  plugins.push(new UglifyJsPlugin());
  plugins.push(
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  );
}

// if(PROD)
// {
//   plugins.push(new webpack.optimize.UglifyJsPlugin({
//     compress: { warnings: false }
//   }))
// }

var config = {
  entry: {
    app: "./src/components/index.tsx",
    vendors: [
      "material-ui",
      "material-ui-icons",
      "mobx",
      "mobx-react",
      "glamorous",
      "firebase",
      "moment",
      "rc-slider",
      "react-image-gallery",
      "react-color",
      "react-motion-ui-pack",
      "react-rnd",
      "react-router-dom",
      "react-router-scroll-memory",
      "react-slick",
      "react-sortable-hoc",
      "react-stack-grid",
      "react-stonecutter",
      "react-tag-input",
      "sortablejs",
      "styled-components",
      "ts-keycode-enum",
      "react-google-tag-manager",
      "victory",
      "react-remarkable",
      "react-scroll"
    ]
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/public/dist"
  },

  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({
  //     minimize: true,
  //     compress: false
  //   })
  // ],

  // Enable sourcemaps for debugging webpack's output.
  devtool: devtool,
  //--optimize-minimize
  resolve: {
    modules: ["node_modules", "./src"],
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json", ".css"]
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      { test: /\.css?$/, loader: "style-loader!css-loader" }
    ]
  },
  plugins: plugins,
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: [
    {
      react: "React",
      "react-dom": "ReactDOM",
      "semantic-ui-react": "semanticUIReact",
      redux: "Redux",
      "react-router-dom": "ReactRouterDOM",
      electron: "electron",
      firebase: "firebase",
      "react-draggable": "ReactDraggable",
      fabric: "fabric"
    }
  ]
};
module.exports = config;

//if Can't find webpack do the following
//npm link webpack
