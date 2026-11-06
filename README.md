# Jem AI Video Studio

A responsive Next.js app for real AI text-to-video and photo-to-video generation using the official Runway Dev SDK.

## Features
- Text to video and photo to video
- Gen-4.5 model
- 5s / 10s clips
- Portrait, landscape and square formats
- Task polling and video playback/download

## Important cost note
Runway Dev is pay-as-you-go. Current listed Gen-4.5 pricing is 12 credits per second and 1 credit = $0.01. That is approximately $0.60 for 5 seconds and $1.20 for 10 seconds, before taxes/fees. Check current prices before generating: https://dev.runway.com/pricing

## Setup
1. Create a Runway Dev account at https://dev.runway.com/ and create an API key.
2. In your hosting provider (e.g. Vercel), add Environment Variable:
   - Name: `RUNWAYML_API_SECRET`
   - Value: your Runway API key
3. Push this folder to GitHub and import the repository into Vercel.
4. Deploy. Never put the API key in browser/client code or commit it to GitHub.
5. Open the deployed site and generate a short test.

## Local development
```bash
npm install
cp .env.example .env.local
# Put your key in .env.local
npm run dev
```

## Notes
- Photo upload is limited to 5 MB and JPG/PNG/WebP in this starter.
- The photo-to-video feature animates the uploaded image according to the prompt; it does not guarantee exact identity preservation.
- Generated media URLs and provider retention policies may change. For a production app, add user authentication, private storage, quotas, billing controls, moderation, and persistent generation history.
- Users must have rights and consent to use uploaded people's photos. Clearly label generated/synthetic video and do not use it for deception or impersonation.
