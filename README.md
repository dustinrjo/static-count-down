# Static Count Down

A simple static web app built with Pug, CoffeeScript, Stylus, and Gulp.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

## Development

Run the development server with live reload:
```bash
gulp watch
```

This will start a local server at `http://localhost:3000` and watch for changes in `src/`.

## Build

Compile the project to the `docs/` directory:
```bash
gulp build
```

## Deployment

To deploy to GitHub Pages:

1.  Push your changes (including the `docs` folder) to GitHub.
2.  Go to your repository settings on GitHub -> Pages.
3.  Select the `main` branch and the `/docs` folder as the source.

