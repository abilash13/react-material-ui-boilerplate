# Boilerplate for a React app using Material UI

## Requirements

- [Node](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/)

## Start

- Make sure you have all the above requirements installed.
- Clone this repo using `git clone https://github.com/abilash13/react-material-ui-boilerplate`.
- Move to the appropriate directory: `cd react-material-ui-boilerplate`.
- Run `yarn` in order to install all the dependencies.
- Run `yarn start` to run the app.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:1234](http://localhost:1234) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

Note: Currently, [Webpack Serve](https://github.com/webpack-contrib/webpack-serve) is being used to serve the app.

### `yarn build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

Note: Currently, [Webpack](https://webpack.js.org/) is being used to build the app.

### `yarn lint`

Lints the app for errors.
It runs ESLint on the app.

[ESLint](https://eslint.org/) will lint the javascript according to the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).<br>

Note: ESLint is also run as part of the build process.

### `yarn prettify`

Formats the code in the app.<br>
It runs [Prettier](https://prettier.io/) on the app which parses your code and re-prints it with its own rules that take the maximum line length (currently configured to be `120`) into account, wrapping code when necessary.

Note: Prettier is also configured to run as a pre-commit hook. This is to enforce a consistent style on the codebase.

## Folder Structure

```
client/
  dist/             # The built app
  node_modules/     # App dependencies
  public/           # Static public assets
    index.html      # HTML page template
    manifest.json   # Metadate for the PWA
  src/              # App source code
    components/     # Global reusable presentational components
    containers/     # Global reusable components conencted to the store
    layout/         # Layout components of the app
    routes/         # Routes of the app -> contains all the container components
    store/          # State management (Redux) specific pieces
    utils/          # Common reusable utilities
    App.jsx         # App skeleton
    index.jsx       # JavaScript entry point
    theme.jsx       # Theme of the app
  package.json      # Metadata of the app
  README.md         # Readme (what you are currently reading)
  yarn.lock         # Lockfile for Yarn
```

For the project to build, **these files must exist with exact filenames**:

- `public/index.html` is the HTML page template;
- `src/index.jsx` is the JavaScript entry point.
