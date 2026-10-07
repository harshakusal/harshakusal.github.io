# Making the talking hero avatar (like the reel)

The hero has a ready-made video slot. Until `assets/hero.mp4` exists, the site shows your photo (`assets/photo_full.jpg`) in its place, so nothing looks broken.

## Step 1: Turn your photo into a 3D stylized character
Use any image-to-image AI tool (for example ChatGPT image generation, Google Gemini, Midjourney with an image reference, or Leonardo). Upload a clear, front-facing, full-body photo, and use a prompt like:

> Clean plain pure-white background, soft studio lighting, straight-on eye-level shot, polished friendly premium 3D stylized character, preserve the reference person's face, skin tone, hair and proportions, not hyper-realistic. Full body, standing, arms relaxed, centered in a portrait (9:16) frame.

Tips:
- Generate 3 or 4 versions and pick the one that looks most like you.
- Keep the background pure white so it blends into the site's cream hero.
- Export at least 1080 px wide (PNG).

## Step 2: Animate it in Hedra
1. Go to hedra.com and create a new character video.
2. Upload the 3D character image from Step 1.
3. Add a voice (record your own or choose an AI voice) with this script, about 10 seconds:

   > "Hi, I'm Harsha. I'm a full stack developer. I build scalable Node.js backends, web apps and AI-powered platforms."

4. In the prompt or settings, ask for natural blinking, small hand gestures and a gentle head movement, with the character centered and facing the camera.
5. Export as **MP4**, portrait (9:16 or 3:4), 720p or 1080p. Keep the file under about 8 MB if you can (HandBrake or `ffmpeg -i in.mp4 -vcodec libx264 -crf 28 -an hero.mp4` will shrink it; the site plays the video muted, so audio can be removed).

## Step 3: Send the files
- Send the **MP4**. It will be dropped in as `assets/hero.mp4`, and the site switches from the photo to the looping video automatically. No code changes are needed.
- Also send a **photo for the ID card** if you'd like a different one: a head-and-shoulders shot, facing the camera, with a plain background works best (`assets/photo.jpg`, portrait 4:5).
