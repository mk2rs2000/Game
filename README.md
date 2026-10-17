# Mimi's Magic Playhouse — V7: Kitten Nursery and Puzzle Games

A Safari-ready, private, child-friendly talking cat playhouse. Works as a static website on GitHub Pages or other HTTPS hosting. No account, advertising, real-world purchases or recorded voice uploads. The microphone feature uses browser APIs and needs HTTPS and permission.

## What's new

- **Kitten Nursery** tab with five coloured eggs: lilac, blue, ginger, green and rare rainbow.
- Each egg costs **50 earned pretend gems**. Only one incubating egg at a time. A kitten stays in the local collection once hatched.
- Four eggs require **12 successfully completed game challenges** to hatch. The rainbow egg requires **level 6 and 18** completed challenges.
- A hatched kitten can be selected to **follow Mimi on Home**. Progress and selections stay in the browser's local storage.
- **Rhythm Dance** replaces infinite tapping. Copy seven arrow beats; five correct are required for a gem reward.
- **Magic Garden Puzzle** replaces repeated watering. Follow the seed, water, sunshine and fairy-magic clues to complete a flower. Correctly finishing the puzzle rewards gems.
- Hatch progress is awarded **only by qualifying game completions**, never by casual taps. Successful Dance, Garden, Star Pop, Gem Hunt, Memory Match, Bubble Pop and Cookie Catch rounds count.
- Snack feeding now asks for three correct food matches, Colour Magic pays on finishing four answers, and Music Mixer is a pattern-copy puzzle. Silly Dares are just for fun, not instant gems.
- More accessories available in the gem shop: **pirate hat, rainbow beanie and crystal crowns**, plus the **Starry Toy Box** (18 gems) and **Pirate Parrot** (35 gems).
- Keeps the original room backgrounds, dresses, fairy hair, hats, wings, voices, voice-speed slider and sound effects.

## Install / update from V6.3

1. Extract this ZIP.
2. Upload **all files at the root of the ZIP** to the root of the existing GitHub Pages repository, replacing older files. Keep the entire `rooms/` folder.
3. Wait for GitHub Pages to publish, then reopen the website on iPhone Safari. You can use `?v=7.0` on the website address to make a fresh navigation request.
4. If Safari still shows an old version, fully close and reopen Safari and clear old website data only as a last resort: clearing website data erases local gems, pets and outfits.

**Important:** Do not rename or move the website to a different domain/path if you want existing local save progress. Version 7 still uses the `mimi-playhouse-v6` browser save key to preserve the gems, outfits and levels from V6.3. Do not delete local storage.

## Privacy and parental notes

- All gems, eggs, kittens, choices and shop progress are fictional and stored locally in the browser.
- The voice clip remains in temporary browser memory for playback and is not saved to the game's progress data or sent to a server by the app.
- There is no online chat, payments, ads or trackers.
- Sound and microphone behaviours need testing on a real iPhone after deployment; development tests use desktop Chromium with a simulated microphone.
- No server backend or Apple developer certificate required.
