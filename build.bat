@echo off
set NEXT_SKIP_TYPECHECKING=true
npm install --legacy-peer-deps && next build --no-lint 