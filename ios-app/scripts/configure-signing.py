"""Validate the supplied App Store profile and install it on a macOS runner."""
import os
import plistlib
import shutil
from datetime import datetime, timezone
from pathlib import Path

temporary = Path(os.environ["RUNNER_TEMP"])
profile = plistlib.loads((temporary / "ciela-profile.plist").read_bytes())
team = "7QNNH4CG65"
bundle = "org.cielasworld.learning"
if profile["TeamIdentifier"] != [team]:
    raise SystemExit("Wrong signing team")
if profile["Entitlements"]["application-identifier"] != f"{team}.{bundle}":
    raise SystemExit("Wrong app identifier")
if profile["Entitlements"].get("get-task-allow") is not False:
    raise SystemExit("Expected a distribution profile")
if profile.get("ProvisionedDevices") or profile.get("ProvisionsAllDevices"):
    raise SystemExit("Expected an App Store profile")
if profile["ExpirationDate"].replace(tzinfo=timezone.utc) <= datetime.now(timezone.utc):
    raise SystemExit("Provisioning profile has expired")
if profile["UUID"] != "08fd1ba8-b7ce-4181-ae04-fad6d638a4c4":
    raise SystemExit("Update the signing configuration for a renewed profile")
for relative in ["Library/MobileDevice/Provisioning Profiles", "Library/Developer/Xcode/UserData/Provisioning Profiles"]:
    destination = Path.home() / relative
    destination.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(temporary / "ciela.mobileprovision", destination / f"{profile['UUID']}.mobileprovision")
options = {
    "method": "app-store-connect",
    "destination": "export",
    "teamID": team,
    "signingStyle": "manual",
    "signingCertificate": "Apple Distribution",
    "provisioningProfiles": {bundle: profile["UUID"]},
    "manageAppVersionAndBuildNumber": False,
    "uploadSymbols": True,
}
(temporary / "CielaExportOptions.plist").write_bytes(plistlib.dumps(options))
print("App Store provisioning profile validated and installed")
