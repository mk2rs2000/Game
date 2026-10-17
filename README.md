# Mimi's Magic Playhouse — V4

A colourful, privacy-first talking cat web app for iPhone Safari and other modern browsers.

## Upload to GitHub Pages (no Apple certificates)

1. Unzip the download. Upload **all eight site files** — `index.html`, `style.css`, `app.js`, `manifest.webmanifest`, `sw.js`, `six-seven.wav`, `icon-192.png`, and `icon-512.png` — to the root of your GitHub Pages repository. Do not upload this README unless you want to.
2. GitHub repository Settings → Pages → Deploy from branch → choose main / root → Save.
3. Open the HTTPS GitHub Pages URL in Safari; use **Add to Home Screen** from Share if desired.
4. Tap to talk. Safari asks for microphone permission; tap Allow, speak, tap Stop & repeat.

**Do not open `index.html` as `file://` in Safari**. iOS microphone recording generally needs HTTPS (or localhost during desktop testing). If replacing an earlier edition, make sure you upload all the new files, not only `index.html`. Safari may cache the previous edition; refresh or use the new URL with `?v=4.3` after upload.

## Features

- 32 dresses and costumes across Everyday, Halloween, Christmas and Seasons; 11 hairstyles; 5 hair colours; 12 hats and extras; 6 fur colours.
- 10 selectable voice transformations; the existing recording may be replayed in another voice **while the page is open**. Pitch and speed change together; some voices use filters/echo. Results vary between devices.
- 8 activities: Star Pop, Mystery Gifts, Feed Mimi, Dance Party, Magic Garden, Colour Magic, Silly Dares, Gem Hunt.
- 18 discoverable gem types, a visible gem album, and free sparkle points. Gem progress and wardrobe choices are kept on **the child's device only** using localStorage. There is no shop, advertising, purchase, account, analytics or chat.
- 6–7 meme button plays an included locally generated sound (`six-seven.wav`) and triggers an animation.

## Privacy

- Microphone is read using browser `getUserMedia` (with permission). Recorded audio is kept in RAM and replayed locally. It is **not uploaded, persisted or included in service-worker cache**, and is discarded on re-recording or closing the page.
- LocalStorage saves only selected clothes/voice and gem progress. Use the Grown-up settings on the Gems page to reset these.
- `sw.js` caches **static site files** for offline access after first load. Offline microphone playback may work on browsers supporting the needed audio APIs; permission and behaviour vary by iOS/Safari version.
- When loading from GitHub Pages, GitHub (like any host) still receives requests and ordinary server metadata for delivery of the site. The site includes no third-party scripts, trackers or fonts.

## Troubleshooting iPhone

- `Tap to talk` requires **HTTPS** and microphone permission in Safari Settings for that website.
- Turn off Silent Mode/increase media volume if voice replay is inaudible.
- If Safari blocks automatic playback after recording, tap `Hear that again!`.
- Voice effects are performed locally by changing playback rate; effects are not professional voice conversion and can vary across Safari versions.
- After uploading an update, Safari may cache older files; refresh the page and check that `app.js` and `style.css` were both updated.

This version has browser automation checks, but has not been tested physically on the user's iPhone.
