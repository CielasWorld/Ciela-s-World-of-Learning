# App icon

The iPhone app icon features Ciela and Chispa on a teal background. It replaces the Capacitor template icon at build time.

The master is branding/ciela-chispa-icon.jpg (opaque, 1024x1024).
After creating the native iOS project, npm run ios:sync installs it into Apple's AppIcon catalog as a 1024x1024 RGB PNG.
Xcode generates the device icon sizes. CI uploads the compiled iPhone icon separately for inspection.

Artwork generated with the built-in image-generation tool from the owner's uploaded Ciela and Chispa character sheets.
Prompt: Create a square app icon with Ciela and Chispa smiling cheek-to-cheek on a rich teal background. Use the uploaded Ciela character sheet as the exact identity lock for face, skin tone, eyes, child age, proportions, hairstyle, goggles, outfit, accessories and design. Use the uploaded Chispa sheet as the exact identity lock for face, species, fur markings, proportions and accessories. Faces large and legible at small sizes. Opaque full-bleed square; no text, labels, frame or pre-rounded corners.

Android and the public website are unchanged by this replacement.
