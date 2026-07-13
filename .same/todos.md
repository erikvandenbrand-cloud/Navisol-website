# Navisol — Fix: real images not showing

## Root causes found
- Nav + footer logo used dead imgur URL -> broken image
- Every page hero used content.home.editorial[N].image (wrong) instead of the real per-page hero fields in content.ts
- PlaceholderImage rendered a "PLACEHOLDER" badge over real photos
- Home hero used a grey shipyard shot instead of hero-drone-varend.jpg / hero video
- Brand gallery, step galleries, work galleries + salonboot video not rendered

## Fixes
- [x] placeholder-image.tsx: badge off by default + fixed malformed duration class
- [x] navigation.tsx + footer.tsx: real local logo (IMG.logo)
- [x] sections.tsx: HeroMedia with optional bg video + photo fallback (video cropped to hide CAD chrome)
- [x] page.tsx: hero video/photo, pillars use customImage/partnerImage
- [x] custom-yacht-building: hero=t.heroImage, render step galleries
- [x] design-build-partner: hero=t.heroImage, add Eagle brand-work gallery
- [x] our-work: hero=t.heroImage, status badges, multi-image gallery, salonboot video
- [x] about: hero=t.heroImage, fullImage=t.fullImage
- [x] Lint clean, all routes 200, verified screenshot + real imagery (NL=EN share IMG map)
