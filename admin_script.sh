#!/usr/bin/env sh
hexo clean
hexo g 
hexo d

git add *
git commit -m "auto commit"

git pull
git push