# Adding Your Photographs 📸

To display your real photos in the Polaroid memory gallery:

1. Drop your couple images into this folder:
   - `public/photos/first-conversation.jpg`
   - `public/photos/rain.jpg`
   - `public/photos/sunset.jpg`
   - `public/photos/balcony.jpg`

2. Open `src/content/letterContent.ts` and set `imagePath`:
   ```ts
   {
     id: 'mem-1',
     title: 'The First Spark',
     imagePath: '/photos/first-conversation.jpg',
     // ...
   }
   ```

*Tip: You can also hover over any polaroid card in the browser and click the "Add Photo" button to preview an image instantly from your phone or computer!*
