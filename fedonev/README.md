# Fedőnév

A Hungarian, browser-only agent-name generator in plain HTML, CSS and JavaScript. No packages, build step, server-side application, database, analytics or remote assets.

## Run

Open `dist/index.html` directly, or serve the `dist` directory with any static web host. For a local preview:

```sh
cd dist
python3 -m http.server 4173
```

Open http://localhost:4173. The Python command is only an optional file server; all application logic runs in the browser.

To share results with other people, upload the **contents of `dist/`** to a publicly accessible static host. A `file:` URL or localhost URL only works on your own computer. No rewrite rules are required: results use URL fragments, such as `#akta=v2-17k`.

## GitHub Pages

The repository includes `.github/workflows/pages.yml`, which tests and publishes only `fedonev/dist/`. No build or application server is needed.

1. Open the repository's **Settings → Pages** and choose **GitHub Actions** under **Build and deployment → Source**.
2. Commit the workflow and push it, together with the application, to `main`.
3. In **Actions**, wait for **Publish Fedonev to GitHub Pages** to finish. The deployment summary and **Settings → Pages** show the live URL.

For `Royaljerry/alias`, the default project URL is `https://royaljerry.github.io/alias/` unless a custom domain is configured. Results use fragments, for example `https://royaljerry.github.io/alias/#akta=v2-2n4`. Assets use relative paths, so the `/alias/` prefix works without changes or rewrite rules.

Subsequent pushes changing the app, its tests or the workflow publish automatically after the checks pass. You can also run it manually from **Actions → Publish Fedonev to GitHub Pages → Run workflow**. This public deployment is separate from the private Sites preview.

## Behavior

- Six Hungarian multiple-choice questions: age group, first-name initial, location category, dislikes, loved ones and favorite color.
- Four options per question; six color options. No precise personal details are collected.
- 96 base names × 64 optional single-word prefixes = **6144 distinct names**.
- A name has at most one added prefix (a color or personality adjective), placed before the base name. Some results have no prefix. No trailing personality phrases or cultural attribution appear on the result screen.
- Every answer affects the output. Every valid combination has a distinct, deterministic name; two people choosing the same answers get the same name.
- All requested cultural worlds, all eleven Hungarian bands and sixteen Hungarian politicians active in the 1990s are represented. Song titles inspire original names; no lyrics are reproduced.
- Progress indicator, back navigation preserving answers, keyboard-accessible native radios, result screen, restart, copy link, optional native sharing and manual-copy fallback.
- Reloading or opening a result link restores the result without completing the quiz.
- Versioned result IDs are validated. Invalid or unknown versions show a recovery screen.
- No cookies, local storage or application network requests. Answers exist only in memory. The result code is reversible; it is not encryption or a privacy boundary. Hosting providers may keep their own standard access logs.

## Files

- `dist/index.html`: document shell and project explanation.
- `dist/style.css`: responsive visual design and locally bundled font declarations.
- `dist/app.js`: quiz, routing and sharing UI.
- `dist/names.js`: versioned dictionaries and deterministic mapping.
- `dist/fonts/`: self-hosted Google Fonts (Barlow Condensed, DM Sans, IBM Plex Mono), with SIL Open Font Licenses.
- `tests/names.test.cjs`: exhaustive name and link verification, invalid-input checks and stable-link fixtures.

## Verify

Requires Node.js only for tests, not for running the application:

```sh
node --check dist/app.js
node --test tests/names.test.cjs
```

New quizzes create v2 links. Existing v1 links retain their original names. Do not reorder or change published dictionaries or mappings: doing so changes old links. Introduce a new URL version and retain the old dictionary when changing the naming scheme.

## Background

Independent fictional game inspired by the idea of cover names and the user-supplied [Nyitott Akták](https://nyitottaktak.hu/) reference. It is not affiliated with that project and makes no allegations about real people. The referenced site's content could not be retrieved during implementation (HTTP 403).

Selected cultural checks: [Európa Kiadó's own archive](https://europakiado.a38.hu/index.php?id=4243&page=text), [P. Box history](https://pbox.hu/cikk04.html), [Illés songs, Hungaroton](https://www.youtube.com/watch?v=pGCA6JHBpjE).
