# brucebravehart.github.io

Custom GitHub Pages landing page with a liquid-glass layout, animated 3D background, and clickable project tiles.

## What it includes

- A rewritten hero that highlights the placeholder profile, interests, skills, and qualifications up front.
- A floating 3D background made with Three.js and translucent shapes.
- Project cards that open repository pages and show a live-site button when one is available.
- A separate stylesheet in [style.css](style.css) and editable content in [script.json](script.json).

## How to use

1. Open [index.html](index.html) in a browser or deploy the folder to GitHub Pages.
2. Edit [script.json](script.json) to replace the filler data with your real name, skills, qualifications, and repositories.
3. Keep [manifest.json](manifest.json) unchanged unless you specifically want to update the PWA metadata.

## File layout

- [index.html](index.html) contains the page structure and the rendering logic.
- [style.css](style.css) contains the visual system and responsive layout.
- [script.json](script.json) contains the page content model.

## Notes

- The page includes embedded fallback content so it still renders if the JSON fetch is unavailable in a local preview.
- The project links in the JSON are placeholders and should be replaced with real repositories when you wire the site to your account.
