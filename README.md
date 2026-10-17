# Mimi's Magic Playhouse V8 — Noughts & Crosses + Flappy Race

**A complete static HTTPS Safari website**, with the V7 nursery, cat eggs, rooms, dress-up, local-only microphone replay and all existing progress preserved.

## New in V8

- **Dance Party is easier:** The Easy mode gives **3.6 seconds per arrow**, compared with 1.15 seconds in V7. **Relaxed** mode has no countdown — each arrow waits for your answer. You only need 4 out of 7 right to earn a game reward. Rewards still happen only at the end of a round.
- **Noughts & Crosses:** Play X against a friendly bot called Pip. Win 5 pretend gems plus a qualified egg-hatching challenge; draws give 2 gems.
- **Mimi's Flappy Race:** A one-tap flapping race against two bots (Pip and Bop) with logs to jump, progress meters, a finish line, place-based gem rewards, and hatching progress for a qualifying first/second-place finish. Tap the canvas or the large FLAP button; best played in portrait Safari.
- **Rooms:** Race and Dance are on the Dance Room shortcuts; Noughts & Crosses and Memory Match in the Dream Bedroom. Both are also on the Games page.
- No accounts, tracking, ads, in-app payments or sent microphone recordings.

## Install

Extract the ZIP and upload **the contents of `mimi-playhouse-v8`** to the root of the existing GitHub Pages repository, replacing the files. Retain the `rooms` directory. Wait for the site to deploy, then visit the HTTPS website with `?v=8.0` once to request the current page. The V8 service worker caches version 8 assets; old files might persist briefly in Safari until the new service worker activates. **Do not clear Safari site data** unless you are willing to lose local saved gems, eggs and clothes.

Keep the same address as V7. Saved progress still uses the existing `mimi-playhouse-v6` localStorage key, so gems, pets and items carry forward automatically.

## Testing and limitations

Game logic and synthetic audio can be checked in desktop Chromium; **the microphone and gameplay still need real iPhone Safari confirmation**. The sounds are generated locally. The bot opponents are client-side simulated characters, not real players.
