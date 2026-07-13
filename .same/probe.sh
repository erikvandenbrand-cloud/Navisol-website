#!/usr/bin/env bash
BASE="https://pub-9d2764b9956d4cd28389cfc126c9a1ef.r2.dev"
for n in 02 03 04 05 06 2 3 4 5 6; do
  for ext in jpg jpeg png webp JPG JPEG; do
    for name in "editorial-$n.$ext" "editorial_$n.$ext" "editorial$n.$ext"; do
      code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/$name")
      if [ "$code" = "200" ]; then
        echo "FOUND: $name"
      fi
    done
  done
done
echo "probe-done"
