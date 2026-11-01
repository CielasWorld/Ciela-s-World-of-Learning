# Ciela's World of Learning — Android
Work only on `android-offline-development`. The public `main` branch now contains a coming-soon page; do not merge it into the Android branch or publish this branch as the website.

## Build
Requires Node.js 22+, Java 21, Android Studio 2025.2.1+ and Android SDK 36.
From `android-app`:
1. `npm install`
2. `node scripts/prepare-web.mjs`
3. `npx cap add android` (first time)
4. `npm run android:sync`
5. `npm run android:open`

The sync script sets version code 2 and disables Android cloud backup. Local progress stays on the device.
When updating an existing Capacitor 7 native project, migrate or regenerate its native folder after backing up any local signing configuration. Do not delete upload keys.

GitHub Actions builds a debug APK and an **unsigned** release AAB. The unsigned AAB cannot be uploaded to Play until signed with the owner's private upload key. Debug signing is for testing only. Each fresh CI runner may generate a different debug key; do not uninstall the tested app to replace it without understanding that local progress may be lost.

## Release
Read [release/PLAY_RELEASE.md](release/PLAY_RELEASE.md).
A build passing is not Play approval or an offline test. Retest every game and progress persistence after the Capacitor/API upgrade.
