# S&S Innovix

## Updated Landing Page

The S&S Innovix landing page has been redeployed to GitHub Pages with the following fixes:

### Asset Paths (base: '/SS-INNOVIX/')

- **Sandeep profile image** — Fixed path resolution in `src/premium/TeamSection.tsx` to use `/assets/Profile images/Sandeep.png` with the Vite `base` prefix, ensuring the image renders on the published site.

- **Sumith profile image** — Fixed path resolution in `src/premium/TeamSection.tsx` to use `/assets/Profile images/Sumith.jpeg` with the Vite `base` prefix.

- **Hero video** — Fixed video source in `src/premium/HeroSection.tsx` to use `/herovideo.mp4` with the `"/"` prefix, which Vite automatically prefixes with `/SS-INNOVIX/` when `GITHUB_PAGES=true` is set.

### Deployment

- Built with `GITHUB_PAGES=true` to ensure all asset paths include the `/SS-INNOVIX/` base path prefix.
- Pushed to `gh-pages` branch using `git subtree push` and `git push --force`.
- Live site: https://sandeepsilumula.github.io/SS-INNOVIX/

### What Was Fixed

| Asset | Issue | Fix |
|-------|-------|-----|
| Sandeep image | Missing / broken image on GitHub Pages | Changed relative path `../assets/...` to `/assets/...` (Vite base-prefixed) |
| Sumith image | Missing / broken image on GitHub Pages | Changed relative path `../assets/...` to `/assets/...` (Vite base-prefixed) |
| Hero video | Video not loading on GitHub Pages | Added `"/"` prefix so Vite prefixes with `/SS-INNOVIX/` |

### README

This file now includes business goals and purpose (avoiding technical stack details).
