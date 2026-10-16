# Mimi & Me — Kitty Playhouse V3 (fixed)

This update repairs the broken Playhouse buttons and record/repeat controls from V2. **Replace all V2 files with the files in this ZIP**. Do not upload the ZIP itself to GitHub Pages.

## What's fixed

- The missing stage element ID that caused JavaScript errors whenever recording, ticking/tickling, dancing, games and the 6–7 meme needed to stop the dance animation.
- Tap **Tap to talk** once to start recording and tap **Stop & repeat** to play it back. Recording ends by itself after 8 seconds.
- Safari-friendly recording: one complete media chunk rather than a sequence of short chunks.
- Correct clean-up of the microphone once the last audio data has arrived.
- Squeaky / Alien / Giant options apply distinct playback rates and pitches. Select the voice **before** recording.
- If Safari blocks automatic playback, a **Hear Mimi!** button appears so you can play the recorded sound on a user tap.
- All the V2 play features are preserved: Star Pop, Lucky Boxes, Feed Mimi, Dress Up, Dance Party, Silly Dare, 6–7, tickling, nose booping and colours.
- Updated app cache version to avoid using a stale V2 service worker cache.

## Update on an existing GitHub Pages site

1. Open the GitHub repository containing the original Mimi & Me website.
2. Replace `index.html`, `sw.js`, `manifest.webmanifest`, `six-seven.mp3`, `icon-192.png` and `icon-512.png` with the files from this ZIP, preserving their names and location in the repo. Commit the changes.
3. Wait for the GitHub Pages deployment to show as successful, then open the existing **https://** site in Safari. Use `?v=3` at the end of the site URL the first time to force Safari to retrieve the new HTML (for example, `https://YOURNAME.github.io/mimi-and-me/?v=3`).
4. If you added the old version to the Home Screen, fully close it and reopen it while online. If it still looks like V2, open the normal URL in Safari and refresh before starting the Home Screen version; a stubborn older web app may need its Home Screen shortcut removed and re-added.
5. Tap **Tap to talk** and allow Safari to use the microphone. You must use HTTPS for microphone access. It will not reliably work by opening an HTML file inside Files.

## Quick test

- Choose **Alien**; tap **Tap to talk**, say something, then tap **Stop & repeat**. Mimi should speak back noticeably faster/higher than **Giant**, which is slow/deep.
- Try **Star Pop** (a panel with a moving star should appear) and **Dance Party** (the cat should animate). Press **6–7** for its dancing numbers and sound.

## Privacy

This standalone, original cat game has no sign-in, advertisements, trackers, cloud AI or speech recognition. Microphone recordings are processed in temporary browser memory and not uploaded to a server or deliberately saved to persistent storage. Audio is discarded after play or interruption, including a failed playback after the user leaves the page. The service worker caches public game files only (HTML, icons, sound effects). Your static hosting provider still receives normal requests for page files and associated metadata such as IP addresses.

## Test note

Browser testing covered game buttons and a complete microphone capture/repeat cycle for all three voice choices in Chromium using a synthetic audio stream. No physical iPhone/Safari microphone session was available to test here.
