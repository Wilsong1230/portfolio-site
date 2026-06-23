# Project screenshots

Drop screenshot image files here, then reference them from `src/data/projects.ts`
in each project's `shots` array. They appear in the project modal and can be
clicked to blow up + share.

Example:

```ts
shots: [
  { src: '/shots/fitness-1.png', caption: 'Workout summary' },
  { src: '/shots/fitness-2.png', caption: 'Apple Watch rings' },
],
```

Notes:
- Paths are served from the site root, so `public/shots/fitness-1.png` → `/shots/fitness-1.png`.
- PNG or JPG both work. Thumbnails are shown 16:10; full image is shown uncropped in the lightbox.
