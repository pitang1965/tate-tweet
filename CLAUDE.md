# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "tate-tweet" (縦書きツイート) - a Japanese vertical text conversion tool for Twitter. It converts horizontal text to vertical Japanese writing format suitable for Twitter posts.

## Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production (runs TypeScript compiler then Vite build)
- `pnpm preview` - Preview production build
- `pnpm test` - Run tests with Vitest
- `pnpm coverage` - Generate test coverage report

## Architecture

### Core Technology Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite 5 with React plugin
- **UI Framework**: Mantine v7 (components, hooks, theming)
- **Routing**: React Router DOM v6
- **Text Processing**: grapheme-splitter for proper Unicode character handling
- **Icons**: Tabler Icons React
- **PWA**: Vite Plugin PWA for offline functionality

### Application Structure

**Main Entry Points:**
- `src/main.tsx` - Application bootstrap with MantineProvider
- `src/App.tsx` - Root component with AppShell layout and routing

**Layout Components:**
- Uses Mantine's AppShell with navbar, aside panel, header, and footer
- Responsive design with breakpoint-based visibility
- Mobile-friendly with collapsible navigation

**Core Pages:**
- `src/pages/HomePage.tsx` - Main conversion interface
- `src/pages/AboutPage.tsx` - Information page
- `src/pages/NotFoundPage.tsx` - 404 handler

**Text Conversion Logic:**
- `src/lib/convTweet.ts` - Core vertical text conversion algorithms
- Handles Japanese character conversion (half-width to full-width)
- Supports configurable line spacing (none, half, full)
- Character and line counting with Twitter limits validation
- Unicode-aware text processing using GraphemeSplitter

### Key Features Implementation

**Text Conversion Process:**
1. Input validation and character counting
2. Half-width to full-width character conversion
3. Text splitting into 2D array representation
4. 90-degree rotation for vertical layout
5. Line spacing insertion based on user preference
6. Trailing whitespace trimming

**User Interface:**
- Real-time conversion preview with debounced updates (200ms)
- Character count validation (140 character Twitter limit)
- Line count warnings (15+ lines may break on mobile)
- Copy to clipboard functionality
- Direct Twitter integration via intent URLs

**PWA Configuration:**
- Service worker for offline functionality
- App manifest with Japanese metadata
- Multiple icon sizes (192x192 to 512x512)
- Standalone display mode

## Testing

- Uses Vitest for unit testing with in-source test blocks
- Test configuration in `vite.config.ts`
- Coverage reporting with c8
- Tests are embedded in source files using `if (import.meta.vitest)` blocks

## Build Configuration

**TypeScript:**
- Strict mode enabled
- ESNext target with modern module resolution
- Vitest types included for in-source testing

**Vite:**
- Development server with React fast refresh
- Production builds use Rollup bundling
- PostCSS with Mantine preset for styling
- PWA plugin with comprehensive asset caching

## Styling Approach

- CSS Modules for component-specific styles
- Mantine's built-in theming system
- Custom gradient buttons and responsive layouts
- Japanese typography considerations (font stacks, character spacing)