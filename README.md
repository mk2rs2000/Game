# Mimi's Magic Playhouse V6.2 — Real Illustrated Rooms

**This fixes the V6.1 issue where selecting a room changed only the stage gradient and label, with no recognisable room behind Mimi.**

## Six REAL illustrated rooms
- 🪩 Dance Room — disco ball, coloured party lights and speakers
- 🛏️ Dream Bedroom — bed, pillow, starry window, teddy and lamp
- 🌷 Magic Garden — trees, fence, flowers, butterflies and sunshine
- 🧁 Treat Kitchen — refrigerator, cupboards, cake and oven
- 💎 Gem Cave — glowing crystals, sparkling cave and treasure chest
- 🎨 Art Studio — painting easel, art supplies, colourful bunting

Choose a room in **Rooms**. You see a picture of it immediately, and **See Mimi in this room!** takes you straight to Home where Mimi stands in the actual illustrated room. The choice is saved locally so it remains after closing Safari or rebooting.

## Installing in Safari (GitHub Pages)
1. **Extract** the ZIP. Upload **all the files and the complete `rooms/` folder** into the same GitHub Pages site folder as your existing `index.html`.
2. Replace the previous `index.html`, `style.css`, `app.js` and `sw.js`; allow GitHub Pages to redeploy.
3. Open your website in Safari with `?v=6.2` appended to its usual URL and refresh. If it still shows old content, close Safari and try again; the service worker is also updated.
4. To check that the room art uploaded, try opening `/rooms/bedroom.svg` on your own site — it should display a bedroom illustration.

## What stays the same
- Existing voice recording, replay, 22 funny voices, speed slider, fart sound and 6–7 button.
- All 12 games, gems, special gems, levels, magical hats, hair, fairy wings, outfits and wands.
- Existing save data under the original key `mimi-playhouse-v6`; **do not clear Safari website data** or it will reset game progress.
- Recordings are never uploaded or permanently saved; no accounts, ads, real payments, or third-party trackers.

## Important
The browser interface and room switching were tested in desktop Chromium. iPhone Safari microphone/audio must still be verified on-device. Keep all new SVG room image files alongside the other website files.
