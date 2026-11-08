# A Letter From My Heart 💌

An emotionally expressive, intimate apology and romantic storytelling website crafted with **React 19**, **Vite**, **TypeScript**, **Tailwind CSS v4**, and **Motion for React**.

Designed with the aesthetic of warm blush paper, soft ivory stationery, deep warm brown ink, and delicate handwritten keepsakes.

---

## 🌹 Storytelling Sequence

1. **Opening (`OpeningSection`)**: A softly animated stationery envelope with a wax seal greeting, accompanied by a clear entry button.
2. **Apology (`ApologySection`)**: Sincere, accountable acknowledgment of hurt and mistake without defensiveness or excuses.
3. **Promise (`PromiseSection`)**: Reflection on the importance of the relationship, a minimalist botanical illustration, and 3 solemn vows that can be individually affirmed and sealed with love.
4. **Memories (`MemoriesSection`)**: Polaroid scrapbook cards with touch-drag swipe navigation, 3D flip card notes on the back, and instant photo upload/customization.
5. **Letter (`LetterSection`)**: A full, beautifully composed stationery paper letter with authentic drop caps, high readability, and handwritten sign-off.
6. **Envelope (`EnvelopeSection`)**: An interactive 3D envelope that unseals on tap, sliding out the final short keepsake message.
7. **Ending (`EndingSection`)**: A quiet, unpressured closing screen with an interactive pulsing heart, tender affirmations, and a restart button.

---

## 🖼️ Personalizing Your Real Photographs

You have two convenient ways to display real photos of you and your girlfriend:

### Method A: In-Browser Instant Upload
- Hover over any polaroid card in the Memories section.
- Click the **"Add Photo"** button at the top-left of the photo frame.
- Select an image from your device—it will immediately render in the polaroid frame with authentic lighting and grain!

### Method B: Static Folder Assets
1. Place your images in `public/photos/`:
   - `public/photos/conversation.jpg`
   - `public/photos/rain.jpg`
   - `public/photos/sunset.jpg`
   - `public/photos/balcony.jpg`
2. Open [`src/content/letterContent.ts`](src/content/letterContent.ts) and update the `imagePath`:
   ```ts
   {
     id: 'mem-1',
     title: 'The First Spark',
     imagePath: '/photos/conversation.jpg',
     // ...
   }
   ```

---

## ✍️ Customizing Words & Letter Content

All narrative copy, names, dates, and promises are centralized in a single file:
👉 **[`src/content/letterContent.ts`](src/content/letterContent.ts)**

- **Names**: Edit `meta.recipient` and `meta.sender`.
- **Apology**: Edit `apology.mainStatement` and `apology.personalReflections`.
- **Vows**: Edit `promise.relationshipStatement` and the `vows` array.
- **Letter**: Edit `letter.salutation`, `letter.paragraphs`, and `letter.postscript`.
- **Final Message**: Edit `envelopeKeepsake.secretMessage`.

---

## 🎵 Ambient Audio & Sound Effects

- Generative ambient piano chords (*Cmaj7* $\rightarrow$ *Am7* $\rightarrow$ *Fmaj7* $\rightarrow$ *G6/9*) running natively via the browser's Web Audio API with zero external audio dependencies.
- Tactile sound effects for wax seal breaks, page turns, polaroid flips, and heart chimes.
- Toggle anytime via the **Music On/Off** pill in the top-right corner.

---

## ⌨️ Controls & Accessibility

- **Keyboard Navigation**: Press <kbd>→</kbd> or <kbd>PageDown</kbd> to proceed; press <kbd>←</kbd> or <kbd>PageUp</kbd> to go back.
- **Touch Swipe**: Swipe left/right on mobile screens to browse memory polaroids.
- **Reduced Motion**: Automatically simplifies all animations when `prefers-reduced-motion` is enabled.

---

## 🚀 Running the Project

```bash
# Start local development server
npm run dev

# Run production build and type checking
npm run build

# Preview production build locally
npm run preview
```
