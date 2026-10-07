# Campus Wayfinder

A responsive campus navigation MVP built with Next.js App Router, TypeScript, Tailwind CSS, and MongoDB/Mongoose.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Campus routes work immediately from the bundled TypeScript data.

To use MongoDB, set `MONGODB_URI` in `.env.local`, restart the dev server, and send a `POST` request to `/api/seed` once. If MongoDB is unset or unavailable, the app logs the connection issue and continues using the bundled campus data.

## API

- `GET /api/locations`
- `GET /api/paths`
- `POST /api/search` with `{ "query": "Where is the AI Lab from the Main Gate?", "defaultSource": "main-gate" }`
- `POST /api/route` with `{ "from": "main-gate", "to": "ai-lab" }`
- `POST /api/seed`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
