# Mimi & Me — Kitty Playhouse (Safari web app v2)

A fun, kid-friendly talking cat for Safari. No AI chat, accounts, adverts, trackers, or speech uploads. Tap **Tap to talk**, say something for up to eight seconds, and tap **Stop & repeat** to hear your voice changed locally on the device.

## What’s new

- **Three funny voices:** Squeaky, Alien, and Giant (choose before recording).
- **Star Pop:** Pop as many stars as possible in a quick 15-second round.
- **Lucky Boxes:** Tap one of three mystery presents and discover the magic star (or a silly frog).
- **Feed Mimi:** Tap fish, strawberry, broccoli or cupcake to see Mimi react.
- **Dress Up:** Add a bow, crown, glasses or party hat; remove outfits anytime.
- **Dance Party:** Mimi dances with confetti and a short local jingle.
- **Silly Dare:** Creative voice challenges that pair with the talking feature.
- **6–7 button, tickles, nose boops, cat colour changes**, and a sound-effects on/off switch.
- All mini-game scores and choices reset when you leave the page; no child profile is saved.

## How to publish to Safari (no Apple certificates)

1. Extract all the files from this ZIP, keeping them together.
2. Put the files into the **root** of a public GitHub repository, for example `mimi-and-me`.
3. Open repository **Settings → Pages → Deploy from a branch → main → /(root)** and save.
4. Open `https://YOURUSERNAME.github.io/mimi-and-me/` in **Safari** on your iPhone.
5. Safari will ask for microphone access only when you tap the microphone. Grant it to use voice repetition.
6. Optional: Safari → Share → Add to Home Screen. The app can run offline *after its files have loaded and been cached.*

**Important:** Safari microphone access requires a secure HTTPS origin (or local development on localhost). Opening `index.html` directly as a local file may let you see the games but prevent voice recording. Uploading a new version to GitHub Pages can take a short while to update old caches; close and reopen the tab if the older version remains.

## Privacy

All game code, artwork, and sounds are bundled. No third-party scripts, analytics, ads or remote audio services. Speech is processed for voice repeat in temporary browser memory and discarded after playback or interruption; it is not sent to a remote server or saved by the app. Nothing is added to localStorage, IndexedDB or cookies. The service worker caches only the public game files. A web host such as GitHub Pages can still see normal website access requests (such as IP addresses), but never receives microphone recordings through this app. The app does not use speech recognition.

This is an independent original cartoon cat, not an official Outfit7/Talking Tom product.
