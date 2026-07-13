#!/usr/bin/env bash
set -u
cd /home/project/navisol-redesign/public/images || exit 1
BASE="https://pub-9d2764b9956d4cd28389cfc126c9a1ef.r2.dev"

FILES="
logo-navisol-transparant.png
hero-drone-varend.jpg
navisol-hero-video-web.mp4
editorial-01.jpg
editorial-02.jpg
editorial-03.jpg
editorial-04.jpg
editorial-05.jpg
editorial-06.jpg
editorial-07.jpg
cascobouw-01.jpg
cascobouw-02.jpg
cascobouw-03.jpg
cascobouw-04.jpg
cascobouw-05.jpg
render-32-ts-01.jpg
render-32-ts-02.jpg
render-32-ts-03.jpg
salonboot-18-8m-still-5.jpg
salonboot-18-8m-still-15.jpg
salonboot-18-8m-still-25.jpg
salonboot-18-8m-video-web.mp4
flamme-40-01.jpg
flamme-40-02.jpg
flamme-40-03.jpg
flamme-40-04.jpg
flamme-40-05.jpg
flamme-40-06.jpg
flamme-40-07.jpg
veluvia-920-01.jpg
veluvia-920-02.jpg
eagle-28sg-01.jpg
eagle-28sg-02.jpg
eagle-28sg-03.jpg
eagle-25ts-01.jpg
"

for f in $FILES; do
  code=$(curl -s -w "%{http_code}" -o "$f" "$BASE/$f")
  sz=$(stat -c%s "$f" 2>/dev/null)
  if [ "$code" != "200" ]; then
    rm -f "$f"
  fi
  printf "%-4s %10s  %s\n" "$code" "${sz:-0}" "$f"
done
