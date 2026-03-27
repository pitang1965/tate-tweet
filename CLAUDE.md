# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "tate-tweet" (縦書きツイート) - a Japanese vertical text conversion tool for X (Twitter). It converts horizontal text to vertical Japanese writing format suitable for posting on X.

**Production URL:** https://tate-tweet.over40web.club/
**Netlify subdomain** (redirects to above): https://tate-tweet.netlify.app/

## Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production (runs TypeScript compiler then Vite build)
- `pnpm preview` - Preview production build
- `pnpm test` - Run all tests with Vitest
- `pnpm test src/lib/convTweet.ts` - Run tests in a specific file
- `pnpm coverage` - Generate test coverage report

## Architecture

### Core Technology Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **UI Framework**: Mantine v7
- **Routing**: React Router DOM v6
- **Text Processing**: grapheme-splitter for Unicode character handling
- **PWA**: Vite Plugin PWA

### Application Structure

`src/App.tsx` sets up Mantine's `AppShell` with Header, Navbar (collapsible on mobile), Footer, and Main content area. Routes: `/` → HomePage, `/about` → AboutPage.

**Core conversion logic** lives entirely in `src/lib/convTweet.ts`:
- `conv2TateTweet(str, lineSpacing)` — main conversion function. Converts half-width to full-width, builds a 2D character array, rotates 90 degrees, inserts spacing, trims trailing whitespace.
- `getCharLength(str)` — Twitter character count: newlines and half-width = 0.5, full-width/emoji = 1.0
- `getNoOfLines(str)` — line count of input

**HomePage** (`src/pages/HomePage.tsx`) uses `useDebouncedValue` (200ms) to trigger conversion on input changes. Warns when character count > 140 or line count > 15.

### In-Source Testing

Tests are embedded in source files using `if (import.meta.vitest)` blocks. Currently only `convTweet.ts` has tests. The `import.meta.vitest` guard is stripped in production builds via `vite.config.ts`.

### Deployment

- Hosted on Netlify
- `public/_redirects` redirects `tate-tweet.netlify.app/*` → `tate-tweet.over40web.club/*` (301)
- Environment variables use `VITE_` prefix (e.g., `VITE_ADSENSE_CLIENT_ID`)

### Advertising

Currently uses 忍者AdMax script in `index.html` and `src/pages/HomePage.tsx`. Planning to migrate to Google AdSense using a React component with `VITE_ADSENSE_CLIENT_ID` env var.
