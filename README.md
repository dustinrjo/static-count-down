# Static Count Down

A simple static web app built with Pug, CoffeeScript, Stylus, and Gulp. It generates a countdown clock based on URL parameters.

## How it Works

The app reads parameters from the URL to determine the target date and the title of the countdown. If no parameters are provided, it displays a random "Hello World" message.

### URL Parameters

You can customize the countdown by adding the following parameters to the URL:

*   `title`: The title displayed above the countdown.
*   `y`: Target Year (e.g., `2026`). Defaults to the current year.
*   `m`: Target Month (1-12). Defaults to the current month.
*   `d`: Target Day (1-31). Defaults to the current day.
*   `hour`: Target Hour (0-23). Defaults to 0 (midnight).
*   `min`: Target Minute (0-59). Defaults to 0.
*   `sec`: Target Second (0-59). Defaults to 0.

### Examples

**Christmas 2026**
```
https://your-site.github.io/?title=Christmas&y=2026&m=12&d=25
```

**Next Month (April 1st)**
Assuming it's currently March:
```
https://your-site.github.io/?title=April%20Fools&m=4&d=1
```

**Countdown to 5:30 PM Today**
```
https://your-site.github.io/?title=Quitting%20Time&hour=17&min=30
```

**Just a Title**
If you only provide a title, it will show the title but no countdown (unless date params are also present).
```
https://your-site.github.io/?title=Hello
```

### Sharing

To share a countdown, simply construct the URL with your desired parameters and send the link! The recipient will see the countdown to the exact time you specified.

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
