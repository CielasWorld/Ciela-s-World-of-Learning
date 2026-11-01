# Google Play release preparation

Status: preparation only; no Play submission has been made.
Package: org.cielasworld.learning
Version: 1.0.0 (versionCode 2)
Price: USD $4.99 one-time, configured in Play Console. No ads, subscriptions, or in-app purchases.
Audience: ages 3–7; review the "5 and under" and "6–8" target age groups.
Category suggestion: educational game.

## Completed evidence
- Owner reports all 11 games worked on their phone with airplane mode on and Wi-Fi off.
- Owner reports progress persisted after closing and reopening.
- These results apply to the earlier Capacitor 7 debug APK. They do not validate the upgraded release candidate.
- The public website was replaced with a coming-soon page separately on main.

## Current build
Capacitor 8 targets Android 16/API 36. CI builds debug APK and unsigned release AAB.
The configure script disables Android cloud backup and uses versionCode 2.
Repeat offline game, audio, touch, back-navigation, screen-edge, rotation, and progress checks on the upgraded build, including a tablet where possible.
CI debug keys are not stable across fresh runners. A replacement debug APK may need a different installation setup. Do not remove the installed copy without first considering its local progress.

## Required before submission
- Developer identity verification: owner reports still pending.
- Confirm whether the account is Personal or Organization. New personal accounts generally require at least 12 closed-test participants opted in continuously for 14 days, followed by a production-access application.
- Create an upload key privately on the owner's Windows computer via Android Studio > Build > Generate Signed App Bundle or APK > Android App Bundle. Back it up securely. Never commit the keystore, passwords, or signing properties to this public repository.
- Enroll in Play App Signing as part of the Play setup. Never upload the CI debug APK as the paid production release.
- CI's AAB is unsigned; do not submit it as-is. Build/sign the release AAB in Android Studio using the private upload key.
- Confirm app icon and splash branding; the generated Android template still needs branding review.
- Provide a public support email chosen by the owner.
- Finalize the privacy policy below with the owner, publish it as a standalone public HTML page, and include an offline-readable copy inside the app's grown-up area.
- Complete Data safety after checking the merged release manifest and dependencies. The current app source uses localStorage and bundled media; no third-party analytics, ads, login, or remote API integration was found. Do not treat this preliminary source check as a complete privacy audit.
- Complete ads declaration (No), app access (no login), target audience, Families declarations and content rating questionnaire. Let the questionnaire assign the rating.
- Add genuine phone screenshots and required store graphics. Do not describe generated promotional images as screenshots.
- Set paid pricing before release; review countries, merchant/payment setup, and local prices in Console.
- Upload the signed AAB to a test track and review Google's pre-launch reports before requesting production.

## Listing draft
App title: Ciela's World of Learning
Short description: Eleven gentle offline learning games for ages 3–7. No ads or subscriptions.
Full description:

Join Ciela and Chispa for a gentle world of early learning.

Designed for children ages 3–7, Ciela's World of Learning brings together 11 educational games covering numbers, counting, letters, shapes, colours, spelling, and a calm-down routine.

All 11 games work offline after installation. Enjoy voice instructions, playful pictures, and encouraging activities without an internet connection.

For grown-ups:
- One-time purchase, with no subscriptions or in-app purchases.
- No advertising.
- Learning progress saved on the device.
- A grown-up area for reviewing and resetting progress.

USD $4.99 is the intended US purchase price; Google Play displays the applicable local price.

## Privacy policy draft — not ready for publication
Publisher display name and public contact email must be confirmed before publication.

Ciela's World of Learning is designed for children ages 3–7.
The app's games and included audio/images are bundled with the installation and can be used offline.
The app does not include ads, account registration, third-party analytics, or subscriptions.
Learning progress and game preferences are stored locally on the device. The app does not send that progress to a developer server.
The release configuration disables Android cloud backup for app data.
A grown-up can reset learning progress using the app's Start over control; clearing Android app storage or uninstalling removes remaining local app data.
Purchases and distribution are handled by Google Play under Google's own terms and privacy practices. The app does not receive payment-card details.
If a grown-up contacts support, the publisher receives the information they choose to send and should use it only to respond.
This statement covers the Android app; it does not describe GitHub Pages hosting logs or independent Google services.

Before publishing, confirm these statements against the final signed build and add the publisher name, support email, effective date, support-data retention/deletion handling, and policy change/contact information.

## Official references checked November 1, 2026
- Target API: https://support.google.com/googleplay/android-developer/answer/11926878
- App content/privacy: https://support.google.com/googleplay/android-developer/answer/9859455
- Children's target audience: https://support.google.com/googleplay/android-developer/answer/9867159
- New personal account testing: https://support.google.com/googleplay/android-developer/answer/14151465
- Capacitor 8 migration: https://capacitorjs.com/docs/updating/8-0
