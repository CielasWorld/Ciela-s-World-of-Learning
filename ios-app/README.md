# Ciela's World of Learning — iOS feasibility build

Work on `ios-offline-development` only. This branch starts from the full Android game source, not the public coming-soon website. Android and main remain independent.

## What this build proves
GitHub Actions compiles the app for the iOS simulator without signing or an Apple developer membership.
It does not prove that all games work on physical iPhones, that Apple will approve the app, or that the output can be installed on a phone.

## Local Mac workflow
Requirements: Node.js 22+, macOS and Xcode 26+.
From ios-app:
1. `npm install`
2. `npm run ios:prepare`
3. `npx cap add ios` (first time; uses Swift Package Manager)
4. `npm run ios:sync`
5. `npm run ios:open`

The game files and media are bundled, with no server.url configured. Review audio, safe areas, touch targets, rotation, background/foreground behavior and local progress on iPhone and iPad.

## Before TestFlight or release
- Confirm Apple Developer Program enrollment and configure signing privately. Never commit Apple credentials, API private keys, certificates, or provisioning profiles.
- Create the App Store Connect record and confirm bundle identifier ownership before first upload.
- Replace template icons and splash visuals with the approved branding.
- Privacy & support is available behind the parent gate and bundled for offline reading. Public policy URL: https://cielasworld.github.io/Ciela-s-World-of-Learning/privacy.html. Review the final build's privacy manifest and disclosures before submission.
- Review children's category, parental gates for external links, and iOS storage/backup behavior. Android's backup setting does not apply to iOS.
- Use TestFlight for physical-device testing after signing and upload. The simulator artifact is not an installable IPA.
- Repeat all 11 offline games and progress checks on iPhone. The previous Android test does not validate iOS.
- Intended business model: USD $4.99 one-time, no ads, no subscriptions, no in-app purchases. Configure pricing and Apple's paid agreement/tax/banking requirements in App Store Connect.
- Keep the website coming-soon page in place until the owner authorizes a launch link.

No Apple account has been enrolled, no purchase made, and nothing submitted to TestFlight or the App Store by this workflow.

## Privacy implementation checks
The November 2 change adds an offline native HTML dialog opened from For grown-ups > Privacy & support. It contains no external links or network fetches. A DOM check covered the gate, correct-answer navigation, opening the policy, support text and focus restoration on closing. Browser dialog behavior is additionally subject to iOS testing.
