# Shark FlexStyle videos

The `/shark-flexstyle` landing page has a **"See the Shark FlexStyle in Action"**
section that plays product demo videos from this folder.

## Add a video

Drop your `.mp4` file here using this **exact** name:

| File name | What it is |
|-----------|------------|
| `shark-demo.mp4` | The main product demo clip (e.g. the 30-second SharkNinja video) |

Until the file is added, the section shows the poster image
(`/images/shark-flexstyle/transformation.jpg`) with a play button.

## How to get the file

Amazon hosts product videos on its own CDN with **signed, temporary URLs** that
expire, so they can't be hot-linked from our site. Download the clip you want to use
(the SharkNinja brand demo is the product manufacturer's own video) and upload it
here as `shark-demo.mp4`.

## Add more than one video

To show several videos, edit `DEMO_VIDEOS` near the top of
`src/app/shark-flexstyle/page.tsx` and add more `{ src, poster, title, subtitle }`
entries (point `src` at additional files in this folder). The grid switches to two
columns automatically when there's more than one.

> Tip: keep clips short (15–40s) and compressed (H.264 .mp4, ideally under ~10 MB)
> for fast loading.
