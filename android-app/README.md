# Ciela's World of Learning — offline Android build

This folder prepares a native Android package from the existing static web app. The public GitHub Pages site and main branch are not modified.

## Requirements
Node.js 20+, Android Studio with Android SDK, Java 17 (or versions supported by the installed Capacitor release).

## Build
From this directory:

1. Run `npm install`.
2. Run `node scripts/prepare-web.mjs`.
3. Run `npx cap add android` (first time only).
4. Run `npm run android:sync`.
5. Run `npm run android:open`.
6. In Android Studio, test in airplane mode, then generate a signed Android App Bundle for Google Play.

The web assets are copied into the APK/AAB, rather than loaded from the live website. Check that every game asset and media file is stored locally and that the app makes no required network requests. A successful build does not prove full offline functionality; test all games on a physical device with network disabled.

Before publishing: review child-directed app policies, privacy/data-safety disclosures, target API level, application ID, signing keys, screenshots and store listing. The $4.99 purchase price is set in Play Console, not in this source tree.
