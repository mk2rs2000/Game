# Mimi & Me — Safari talking cat

A kid-friendly, Talking Tom-inspired talking cat. All microphone audio stays in the browser. The app processes it locally and replays it once at a higher pitch, then drops it from memory. No AI chat, sign-in, tracking, adverts, or voice uploads.

## How to put it on an iPhone (no Apple certificates)

1. Create a **public** GitHub repository, for example `mimi-and-me`.
2. Upload all files **from this folder** into the repository root. `index.html` must be at the root.
3. In the repository open **Settings → Pages** and select **Deploy from a branch → main → /(root)**. Save.
4. Open the GitHub Pages HTTPS address on your iPhone in **Safari**: `https://YOURUSERNAME.github.io/mimi-and-me/`.
5. Tap **Tap to talk**, allow Safari microphone access, speak, and tap **Stop & repeat**. The app replays her voice in a higher, sillier pitch.
6. Optionally, in Safari tap **Share → Add to Home Screen**. Once loaded, the app can also work offline using its service worker (including the 6–7 sound).

You can also host these files on any static HTTPS web host. **HTTPS is important:** iPhone Safari may block microphone use on local HTML files or non-secure HTTP pages. Microphone permission is requested only when the mic button is tapped.

## Buttons
- **Tap to talk:** starts recording; tap again or wait 8 seconds. Records only in device memory.
- **SIX! SEVEN!:** cat dances, shows 6–7, plays the included locally generated jingle.
- **Tickle Mimi / Boop nose / Tap cat:** giggles and animations.
- **Three colours:** change appearance in the current session without storing preferences.

## Privacy and security notes
- Zero external scripts, fonts, trackers, APIs, or audio uploads. The prerecorded 6–7 jingle is supplied as a bundled file.
- Voice data remains local and is discarded after playback, on interruption, or when leaving the page. No recording is deliberately saved in browser storage.
- The service worker caches **only public app assets**, not microphone audio.
- Your *hosting provider*, such as GitHub Pages, may log standard website requests (for example, IP address). This is separate from the app and doesn't include microphone content.
- Safari still mediates device microphone permissions. A parent can revoke the permission in iPhone settings at any time.
- This is a simple independent cartoon cat, not an official Talking Tom or Outfit7 product.

Open `index.html` in a desktop browser to see the design; for microphone access on iOS, use an HTTPS link as above.
