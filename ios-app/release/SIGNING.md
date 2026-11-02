# iPhone App Store signing

The `iOS signed App Store build` workflow runs only on
`ios-offline-development`. It creates an App Store IPA; it does not upload to
Apple, invite testers, submit a review, or publish a release.

## One-time private setup

The owner must authorize storing these credentials in GitHub Actions secrets.
Never commit them as files. Create these repository secrets in Settings →
Secrets and variables → Actions:

| Secret | Private backup file whose contents to paste |
| --- | --- |
| `IOS_DISTRIBUTION_P12_BASE64` | `IOS_DISTRIBUTION_P12_BASE64.txt` |
| `IOS_DISTRIBUTION_P12_PASSWORD` | `IOS_DISTRIBUTION_P12_PASSWORD.txt` |
| `IOS_APPSTORE_PROFILE_BASE64` | `IOS_APPSTORE_PROFILE_BASE64.txt` |

The backup contains signing credentials. Keep it private, outside this public
repository. Base64 is encoding, not encryption. The encrypted P12 and its
password together allow signing applications for the Apple developer team.

## Build

Request a build by updating `ios-app/release/build-request.txt` on
`ios-offline-development`. Other source changes do not trigger signing. The
GitHub manual-run button requires the workflow on the default branch; it is
intentionally absent there to leave `main` unchanged. Download `Cielas-World-signed-AppStore-IPA`
after success. App Store IPAs are uploaded to App Store Connect for TestFlight;
they cannot be installed directly on an iPhone as an Android APK can.

The hosted Mac imports the identity into a temporary keychain, validates the
profile's team, app ID, distribution type, UUID, and expiry, archives only the
application target with manual signing, exports an IPA, verifies its signature,
and deletes the temporary identity and profile. Secrets are not included in
build artifacts. The signed IPA artifact is retained for seven days.

Certificate and profile expire November 2, 2027. Renew them before the next build
after expiry; update the expected profile UUID in the scripts and cleanup step.
The bundle ID is `org.cielasworld.learning`; the version is `1.0`, with workflow
run number as the build number. Simulator builds do not verify signing.

Upload authentication for App Store Connect is a separate setup step.
Physical iPhone testing, screenshots, privacy declarations, age rating,
pricing, paid-app agreements, and review submission still remain.
