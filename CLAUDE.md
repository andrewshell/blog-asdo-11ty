# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this
repository.

## Project Overview

This is Andrew Shell's personal weblog built with **Eleventy 3.0**, a static site generator. The
site features essays, notes, and pages with IndieWeb integration, deployed on Netlify.

## Development Commands

- `npm start` - Start development server with live reload
- `npm run build` - Build production site to `_site/`
- `npm run debug` - Run build with Eleventy debugging enabled
- `npm run benchmark` - Run build with performance benchmarking
- `npm run lint` - Run ESLint on JavaScript files
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is properly formatted

## Architecture

### Content Structure

- **Essays**: Long-form blog posts in `content/essays/` with date prefixes (`YYYYMMDD-slug.md`)
- **Notes**: Short-form content in `content/notes/` for technical documentation
- **Pages**: Static pages in `content/pages/` for about, contact, etc.
- **Images**: Media assets in `content/img/` with automatic optimization

### Template System

- **Layouts**: Base templates in `_includes/layouts/`
  - `base.njk` - Main HTML wrapper with head/footer
  - `essay.njk` - Blog post layout with metadata
  - `home.njk` - Homepage with post listings
  - `page.njk` - General page layout
- **Components**: Reusable parts in `_includes/` (bio, postslist)

### Configuration

- **Main Config**: `eleventy.config.js` (ES modules)
- **Filters**: Custom functions in `_config/filters.js`
- **Drafts**: Draft handling in `_config/drafts.js`
- **Metadata**: Site data in `_data/metadata.js`
- **Validation**: Front matter schemas in `_data/eleventyDataSchema.js`

## Key Features

### Content Management

- **Draft System**: Content marked as drafts shows only in development
- **Date-based URLs**: Essay filenames have dates but URLs don't (`/essays/slug/`)
- **Collections**: Auto-generated from content directories
- **Front Matter Validation**: Zod schemas ensure content consistency

### IndieWeb Integration

- **Webmentions**: Via Netlify plugin
- **ActivityPub**: Bridgy Fed integration
- **Microformats**: h-card and h-entry markup
- **RSS**: Multiple feeds with RSS Cloud support

### Asset Pipeline

- **Images**: Automatic AVIF/WebP generation with responsive sizes
- **CSS**: Bundled per-page with critical CSS inlined
- **JavaScript**: Bundled when needed, progressively enhanced

## Content Guidelines

### Essays

- Use date prefix format: `YYYYMMDD-slug.md`
- Required front matter: `title`, `date`, `description`
- Optional: `canonical`, `enclosure` (for podcasting), `syndication`

### Front Matter Schema

All content validates against schemas in `_data/eleventyDataSchema.js`. Key fields:

- `title` (required)
- `date` (required for essays)
- `description` (recommended)
- `draft` (boolean, hides from production)
- `tags` (array)

## Deployment

- **Platform**: Netlify
- **Build**: Automatic on push to master
- **Analytics**: Umami (production only)
- **Headers**: Custom CORS and memorial headers configured

## Development Notes

- Uses ES modules (`"type": "module"` in package.json)
- Requires Node.js 22+
- Draft content appears in development but not production
- Images automatically optimize to multiple formats
- Service worker manifest included for PWA capabilities
