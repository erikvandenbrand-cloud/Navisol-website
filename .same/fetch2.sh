#!/usr/bin/env bash
set -u
cd /home/project/navisol-redesign/public/images || exit 1
BASE="https://pub-9d2764b9956d4cd28389cfc126c9a1ef.r2.dev"

FILES="
editorial-02-panorama.jpg
editorial-03-panorama.jpg
editorial-04-panorama.jpg
editorial-05-werf.jpg
editorial-06-werf.jpg
"

for f in $FILES; do
  code=$(curl -s -w "%{http_code}" -o "$f" "$BASE/$f")
  sz=$(stat -c%s "$f" 2>/dev/null)
  if [ "$code" != "200" ]; then rm -f "$f"; fi
  printf "%-4s %10s  %s\n" "$code" "${sz:-0}" "$f"
done
