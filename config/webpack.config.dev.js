const path = require('path');

const webpack = require('webpack');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const webpackServeWaitpage = require('webpack-serve-waitpage');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const getClientEnvironment = require('./env');
const paths = require('./paths');

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = '';
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

module.exports = {
  // Tells Webpack to use its built-in optimizations for development.
  mode: 'development',
  // This is the "entry point" to our application.
  // This means it will be the "root" import that is included in the JS bundle.
  entry: paths.appIndexJs,
  // Options related to how webpack emits results.
  output: {
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // This is the target directory for all the output files.
    path: paths.appBuild,
    // This does not produce a real file. It's just the virtual path that is
    // served by webpack-serve in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: 'assets/js/bundle.js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: 'assets/js/[name].chunk.js',
    // This is the URL that app is served from. We use "/" in development.
    publicPath,
    // Point sourcemap entries to original disk location (format as URL on Windows).
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  // Configuration regarding how webpack runs optimizations.
  optimization: {
    // Automatically split vendor and commons.
    splitChunks: {
      chunks: 'all',
      name: 'vendors',
    },
    // Keep the runtime chunk seperated to enable long term caching.
    runtimeChunk: true,
  },
  // Configuration regarding modules.
  module: {
    // Makes missing exports an error instead of warning.
    strictExportPresence: true,
    // Rules for modules (configure loaders, parser options, etc.).
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },
      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        loader: require.resolve('eslint-loader'),
        options: {
          cache: true,
        },
        include: paths.srcPaths,
        exclude: [/[/\\\\]node_modules[/\\\\]/],
      },
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          // "url" loader works like "file" loader except that it embeds assets
          // smaller than specified limit in bytes as data URLs to avoid requests.
          // A missing `test` is equivalent to a match.
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'assets/media/[name].[hash:8].[ext]',
            },
          },
          // Process application JS with Babel.
          {
            test: /\.(js|jsx)$/,
            include: paths.srcPaths,
            exclude: [/[/\\\\]node_modules[/\\\\]/],
            use: [
              // This loader parallelizes code compilation, it is optional but
              // improves compile time on larger projects
              {
                loader: require.resolve('thread-loader'),
                options: {
                  poolTimeout: Infinity, // keep workers alive for more effective watch mode
                },
              },
              {
                loader: require.resolve('babel-loader'),
                options: {
                  // This is a feature of `babel-loader` for webpack (not Babel itself).
                  // It enables caching results in ./node_modules/.cache/babel-loader/
                  // directory for faster rebuilds.
                  cacheDirectory: true,
                  highlightCode: true,
                },
              },
            ],
          },
          // "file" loader makes sure those assets get served by Webpack Serve.
          // When you `import` an asset, you get its (virtual) filename.
          // In production, they would get copied to the `dist` folder.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|jsx)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'assets/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      // ** STOP ** Are you adding a new loader?
      // Make sure to add the new loader(s) before the "file" loader.
    ],
  },
  // Options for resolving module requests.
  resolve: {
    // This allows us to set a fallback for where Webpack should look for modules.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts. This matches the Node resolution mechanism.
    modules: ['node_modules', paths.appNodeModules, paths.appSrc],
    // Extensions that are used by Webpack to automatically resolve imports
    extensions: ['.js', '.json', '.jsx'],
    // Additional plugins applied to the resolver.
    plugins: [
      // Prevents users from importing files from outside of src/ (or node_modules/).
      // This often causes confusion because we only process files within src/ with babel.
      // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
      // please link the files into your node_modules/ and let module-resolution kick in.
      // Make sure your source files are compiled, as they will not be processed in any way.
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
    ],
  },
  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become
  // cumbersome.
  performance: {
    hints: false,
  },
  // See transformed code while debugging.
  devtool: 'cheap-module-source-map',
  // Options for webpack-serve.
  serve: {
    content: paths.appBuild,
    add: (app, middleware, options) => {
      app.use(webpackServeWaitpage(options, { theme: 'material' }));
      app.use(convert(history()));
    },
    open: true,
  },
  // List of additional plugins.
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In development, this will be an empty string.
    // new InterpolateHtmlPlugin(env.raw),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
    new webpack.DefinePlugin(env.stringified),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    new CaseSensitivePathsPlugin(),
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // We can add this if we use Moment.js:
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath,
    }),
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};
