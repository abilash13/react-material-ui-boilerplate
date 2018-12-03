const path = require('path');
const fs = require('fs');
const url = require('url');

// Make sure any symlinks in the project folder are resolved:
const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

const ensureSlash = (pathString, needsSlash) => {
  const hasSlash = pathString.endsWith('/');
  if (hasSlash && !needsSlash) {
    return pathString.substr(pathString, pathString.length - 1);
  }
  if (!hasSlash && needsSlash) {
    return `${pathString}/`;
  }
  return pathString;
};

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/assets/js/bundle.7289d.js. We have to know the root.
const getPublicUrl = appPackageJson => envPublicUrl || require(appPackageJson).homepage; // eslint-disable-line global-require, import/no-dynamic-require

const getServedPath = appPackageJson => {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl = envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
};

module.exports = {
  dotenv: resolveApp('.env'),
  appBuild: resolveApp('dist'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.jsx'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveApp('src/setupTests.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
};
