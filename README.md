# Mimi's Magic Playhouse — V6.1 Fairy Boutique & Rooms Fix

This is a **complete replacement for V6**, not a patch. It stays a private, standalone web game for iPhone Safari. No accounts, AI chat, purchases, ads, voice uploads or analytics.

## Fixes
- The previous V6 HTML was still loading `app.js?v=5.0`, so Safari could run old code and make Rooms appear unresponsive. Now HTML, CSS, JS and the offline cache use matching V6.1 URLs.
- The Rooms tab opens all six rooms; selecting a room changes the home stage and the room mini-game links work.
- Old V6 gems, progress, outfits and purchases are kept in `localStorage` under `mimi-playhouse-v6`. If no V6 save exists, the previous V5 save (`mimi-playhouse-v4`) is imported.
- Game timers are tidied up when leaving activities.

## What's new
- **Glow hats** (8) — tiaras, Christmas hat, fairy crowns and halos.
- **Colour-changing hairstyles** (6) — rainbow curls, fairy locks, mermaid waves and more.
- **Glowing fairy wings** (5) — from little wings to Starlight Queen Wings.
- **More fairy dresses** (4) and **fairy wands** (3).
- Effects slowly cycle through hues and fade brighter and dimmer. Each piece starts at a random phase for variety. Respect reduced-motion settings.
- Each special item must be unlocked in the Gem Shop using in-game gems *and* reaching the required level. No real money.
- **Fart!** button on Home plays a locally synthesised silly sound and makes Mimi giggle (respects Effects Off toggle).
- Talking-back recording and the 22 existing funny voices are still included, with slow/fast replay.

## How to publish in Safari
1. Extract the ZIP.
2. Upload **the contents** (including `index.html`, `app.js`, `style.css`, `sw.js` and icons) over your existing GitHub Pages site's files — don't accidentally nest them in an extra folder.
3. Wait for GitHub Pages deployment, then open the site in Safari with `?v=6.1` appended to the URL (or `&v=6.1` if your URL already contains `?`). Refresh once more if needed.
4. If Safari's Home Screen app still shows old buttons, quit/reopen it or delete the old shortcut and add it again. Deleting a shortcut generally doesn't wipe Safari site storage, but clearing website data can lose saved gem progress.
5. Test Rooms, Shop, magical outfit equipment, then Tap to Talk with microphone permission.

## Privacy and limits
Audio is used for immediate local playback and not uploaded, deliberately stored permanently or transmitted to servers. Only game progress/preferences are stored locally. The HTML, CSS and scripts are static and should be hosted over HTTPS to use the microphone. Do not clear browser site data if you want to keep progress. Games and purchase flows were tested in Chromium using the local app code, with simulated microphone audio. Real iPhone Safari microphone and audio output are not verified here.
