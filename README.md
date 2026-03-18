# Nira's 2nd Birthday Bash 🐝

A birthday invitation website for Nira's 2nd birthday, built with Next.js 15, Framer Motion, and Tailwind CSS.

## Tech Stack

- **Next.js 15** — App Router, SSR/SSG
- **React 19** — UI framework
- **Framer Motion 11** — Animations and transitions
- **Tailwind CSS 3** — Styling
- **Resend** — Email delivery for RSVP
- **TypeScript 5** — Type safety

## Project Structure

```
src/
├── app/
│   ├── api/          # API routes (RSVP email)
│   ├── globals.css   # Global styles & Tailwind directives
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Home page
├── components/       # UI components (Landing, PhotoCarousel, etc.)
├── data/
│   └── photos.ts     # Photo metadata and milestone data
└── animations/       # Shared Framer Motion variants
public/
└── photos/           # Place photo images here (nira-1.jpeg … nira-8.jpeg)
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Adding Photos

Place JPEG photos in `public/photos/` following this naming convention:

| File | Caption |
|------|---------|
| `nira-1.jpeg` | Welcome to the World (1 Month) |
| `nira-2.jpeg` | First Smile (3 Months) |
| `nira-3.jpeg` | Curious Eyes (6 Months) |
| `nira-4.jpeg` | Sitting Up Tall (8 Months) |
| `nira-5.jpeg` | First Steps (11 Months) |
| `nira-6.jpeg` | First Birthday (1 Year) |
| `nira-7.jpeg` | Little Explorer (18 Months) |
| `nira-8.jpeg` | Almost Two! (22 Months) |

Photo captions and milestone data are configured in [`src/data/photos.ts`](src/data/photos.ts).

## Environment Variables

Create a `.env.local` file in the root for RSVP email functionality:

```env
RESEND_API_KEY=your_resend_api_key
```
