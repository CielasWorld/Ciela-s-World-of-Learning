# Ciela's World of Learning — iOS release handoff (November 3, 2026)

Scope: iOS development branch only. Do not change the public website, Android build, or `main`.

## Owner-approved commercial and content decisions
- App name: Ciela's World of Learning
- Price: US $4.99 one-time purchase; no subscriptions or advertising
- Intended audience: children ages 3–7, with accurate Apple age-rating questionnaire responses; retain breathing and stretching content even if Apple assigns an older rating
- Availability: worldwide (subject to App Store Connect territory and pricing settings)
- Content: 11 offline educational activities
- Artwork/audio: owner confirms ownership or licenses
- App privacy declaration: owner authorizes "Data Not Collected" **only after verification** that app code and all embedded SDKs do not collect or transmit user/device data, including analytics, crash reports and identifiers

## App Store metadata draft
**Name:** Ciela's World of Learning
**Subtitle:** 11 Fun Offline Learning Games
**Promotional text:** Join Ciela and Chispa for colorful learning adventures! Explore 11 activities designed for young learners—even without an internet connection.
**Description:**
Bring playful learning wherever you go with Ciela's World of Learning!

Young learners can explore 11 colorful educational activities with Ciela and Chispa, covering numbers, counting, shapes, colors, letters, word play, and calm moments.

- 11 interactive learning activities
- Works offline once installed
- Designed for young learners and families
- One-time purchase: no subscriptions or in-app advertising
- Friendly characters and colorful activities

Whether at home or on the go, Ciela and Chispa make learning an adventure.

**Keywords (draft):** preschool,learning,kids,offline,numbers,letters,shapes,colors,counting,educational
**Primary category (proposed):** Education
**Age rating:** Complete Apple's questionnaire honestly. Do not assume 9+ without Apple's computed result.
**Pricing/availability:** $4.99 United States base price; select worldwide territories and review localized price tiers.
**Privacy:** "Data Not Collected" only after code/SDK audit.
**Copyright:** Confirm legal owner name and year in App Store Connect.
**Support URL / Privacy Policy URL:** Confirm publicly available production URLs from existing site; do not invent.
**Review notes (draft):** All 11 activities are playable offline. No account, subscription or in-app purchase is required. Review the games by opening each tile on the learning menu.

## Screenshot/test evidence
GitHub Actions run: https://github.com/CielasWorld/Ciela-s-World-of-Learning/actions/runs/41722133948
Branch at run: ios-offline-development, SHA 88bf43bc15d9a0a72327387acc83adf0a0651286
Job: release-screenshots — success.
- iPhone 17 Pro: 12 named captures (menu plus 11 activities), 1 UI test passed, 0 failures.
- iPad Air 13-inch (M3): 12 named captures (menu plus 11 activities), 1 UI test passed, 0 failures.
- Artifact: Cielas-World-AppStore-screenshots, ID 13274025761, expires November 17, 2026.

Automated coverage confirms opening each activity and producing an image. It does not establish all interactions, offline transitions, parental gates, screenshot quality or Apple review acceptance.

## Remaining release blockers
1. Download screenshot artifact and visually check every image for readable UI, safe areas, stretching, visual fidelity, and required screenshot dimensions.
2. Upload approved device screenshots to the correct device slots in App Store Connect.
3. Independently validate real-device offline gameplay across all 11 games (including app launch after airplane mode).
4. Audit app code, Capacitor plugins, third-party SDKs and network traffic before applying "Data Not Collected".
5. Confirm app version/build 3 is processing and selected for the intended App Store version; verify TestFlight status and iPad compatibility.
6. Enter metadata, Support/Privacy URLs, worldwide territories, pricing, age questionnaire, copyright and other App Store compliance answers.
7. Submit for App Review only after all required fields and validations pass. No App Store submission is claimed in this handoff.
