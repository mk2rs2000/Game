# Mimi's Magic Playhouse V5 — Gem Shop & Voice Studio

A private, playful Safari website. This version upgrades V4 without throwing away locally saved gems, collection progress or outfits, provided you open the same website/domain on the same browser/device. The new features do not use real money or require accounts.

## What's new?

- **Magic Shop:** 12 **gem-only glowing dresses**, including twinkling Christmas tree lights, Candy Cane Twinkle, Christmas Elf Sparkle, Pumpkin Glow, Winter Queen and Rainbow Magic Gown.
- **Magic Wands:** 9 **gem-only wands**, including Star, Christmas Holly, Twinkling Tree, Snowflake and Rainbow. When equipped, Mimi holds the glowing wand in her paw.
- **Two types of gems:** Ordinary blue gems are **currency**, earned by playing games and spent to unlock dresses and wands. The 18 named special jewels are **collectibles** in the Gems page; they are not spent.
- **Find all 18:** The first earned game reward reveals a special gem; another is revealed after every two additional earned game rewards, until the album is complete. Tap any jewel to see its name and collection status. Keep playing to collect all 18.
- **Voices:** 22 locally processed silly presets, including Baby Kitty, Dinosaur, Underwater, Witch, Telephone, Cave Echo, Pixie and the original effects.
- **Playback speed:** Slow / Normal / Fast buttons or adjustable **0.50x–1.75x** slider on the Home and Voices pages. Pick a new voice or speed and replay the last recording without recording again. *The rate adjustment affects both speed and pitch*, which is normal for browser audio.
- Dress-up has new **Magic Dresses** and **Wands** tabs so purchased items can be worn again.

## Publish to GitHub Pages

1. Extract the ZIP. Upload all 8 website files (`index.html`, `app.js`, `style.css`, `sw.js`, `manifest.webmanifest`, `six-seven.wav`, `icon-192.png`, `icon-512.png`) to the **same GitHub Pages repository and directory** as V4, replacing the previous versions.
2. Keep GitHub Pages serving the branch root through **Settings > Pages**. Open the `https://` site in Safari. The site must use HTTPS for microphone access.
3. Refresh Safari after deployment, or open the address with `?v=5.0` appended to the URL. An old service-worker cache may require closing and reopening the page. Please upload every site file, **not just index.html**.
4. Tap **Tap to talk**, grant microphone permission, speak, then **Stop & repeat**. Choose another voice or move the speed slider to replay the same recording differently.
5. Play games to earn blue gems, then open **Shop** and buy outfits/wands with them. **No Apple developer account, app signing or certificates are required.**

## Saving and privacy

- Gem balances, discovered special jewels, wardrobe choices, shop unlocks, selected voice and speed are saved in browser `localStorage` on the device. Opening the website in a different browser/domain or clearing Safari website data may reset progress. Reset is available under **Gems > Grown-up settings**.
- Microphone access is requested by the browser. Recorded clips are kept in memory only for repeat playback and are discarded on replacement or page close. They are **not sent to a server or saved to storage** by the app.
- No advertising, third-party scripts, analytics, login, AI conversation or real-money purchases. Static files can be cached offline after initial load. Your web host may still receive ordinary requests to serve the files.

## Testing and limitations

Automated Chromium tests verified: all eight interactive games, the 18-special-gem discovery path, gem spending and unlock persistence, 12 dresses, nine wands, V4 progress migration, all 22 voice choices, and simulated microphone recording with two different playback rates. **Not physically tested on an iPhone or in Safari**, so real Safari microphone permission/playback should still be checked.

Safari/browser pitch/rate behaviour can vary, especially if the audio-decoder fallback is used. If an attempted recording has no sound, verify HTTPS, microphone permissions, media volume and Safari version. **Speech is repeated acoustically; no speech-to-text or AI is used.**
