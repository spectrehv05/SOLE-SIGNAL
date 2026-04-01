# SOLE/SIGNAL

SOLE/SIGNAL is a modern streetwear and sneaker tracker built with plain HTML, CSS, and JavaScript. It combines an editorial, Apple-inspired visual style with a data-driven product grid so users can explore sneaker drops, compare retail and resale pricing, filter by brand or category, and save favorites to a personal watchlist.

## Overview

This project was designed as a clean frontend-only experience with no frameworks involved. The goal was to create something that feels polished and aesthetic while still demonstrating strong JavaScript fundamentals such as:

- `fetch()` for loading sneaker data
- `filter()` for live search and category refinement
- `sort()` for release date, resale, retail, and hype ordering
- `map()` and template rendering for dynamic card generation
- `reduce()` for stats and trend summaries
- `localStorage` for persistent watchlist behavior

## Features

- Premium landing section with bold typography and fashion-inspired visuals
- Sneaker tracker dashboard with live search
- Brand and category filtering
- Sorting by release date, resale price, retail price, and hype score
- Featured drop spotlight
- Stats panel for tracked pairs, average resale, top brand, and watchlist count
- Personal watchlist with persistent saved items
- Responsive layout for desktop and mobile
- Real sneaker imagery integrated into the product cards

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Local JSON dataset
- Browser `localStorage`

## Project Structure

```text
SOLE-SIGNAL/
├── data/
│   └── sneakers.json
├── index.html
├── styles.css
├── script.js
└── README.md
```

## How It Works

1. The app loads sneaker data from `data/sneakers.json`.
2. JavaScript hydrates each sneaker with image metadata for richer presentation.
3. User input from search, brand, category, and sort controls updates the displayed sneaker list in real time.
4. Computed insights and summary stats are recalculated from the active data.
5. Saved sneakers are stored in `localStorage` so the watchlist remains available after refresh.

## Running Locally

Because the app uses `fetch()` for local JSON data, it should be served through a local server instead of opened directly as a `file://` page.

Example:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Design Direction

SOLE/SIGNAL leans into a Gen Z-friendly visual identity:

- soft neutral backgrounds
- glassmorphism-inspired panels
- bold typography
- high-impact product imagery
- clean spacing and premium composition

The result is a sneaker discovery experience that feels more like a fashion editorial than a basic catalog.

## Future Improvements

- Connect to a live sneaker API for real-time market and release data
- Add detailed product pages
- Add price history charts
- Add dark/light theme toggle
- Support user-created collections beyond the watchlist

## Author

Created by Harshvardhan.
