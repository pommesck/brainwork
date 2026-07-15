#!/bin/bash

set -e

MESSAGE="$1"

if [ -z "$MESSAGE" ]; then
    MESSAGE="Website Update"
fi


echo "=== Git add ==="
git add .


echo "=== Git commit ==="
git commit -m "$MESSAGE" || echo "Keine Änderungen zum Committen"


echo "=== Git push ==="
git push


echo "=== Quartz build ==="
cd quartz
npx quartz build


echo "=== Upload Webgo ==="
rsync -avz --delete \
public/ webgo:~/www/krich.eu


echo "=== Fertig ==="
