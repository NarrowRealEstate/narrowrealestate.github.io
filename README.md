# Narrow Real Estate

A clean, modern real estate listing and discovery platform focused on Pampanga, Philippines (Angeles City, Bacolor, San Fernando, Mabalacat, Mexico, and Porac).

---

## Features & Pages

- **Home (`index.html`)**: Clean hero section, curated featured properties, "Why Us" value highlights, call-to-action banner, and global footer.
- **Properties Catalog (`properties.html`)**: Reactive live filter system (by location, property type, maximum budget, and minimum bedrooms) with responsive listing cards.
- **Property Detail (`property-detail.html`)**: Comprehensive single-property view with dynamic URL parameter routing (`?id=<id>`), interactive photo carousel, full-screen lightbox modal, specs overview, amenities, and agent inquiry form.
- **List Your Property (`list-property.html`)**: Dedicated seller submission form with seller contact details, property specifications, pricing, drag-and-drop photo upload with file chips, and submission modal.
- **Contact Us (`contact.html`)**: General contact and inquiry form with tailored buyer/seller channels, office address, phone numbers, and operating hours.

---

## Directory Structure

```
Narrow/
├── index.html              # Homepage
├── properties.html         # Catalog & Live Search
├── property-detail.html    # Single Property View & Gallery Lightbox
├── list-property.html      # Seller Property Listing Form
├── contact.html            # Contact & Office Information
├── css/
│   ├── styles.css          # Global styles, variables, typography & layout
│   ├── index.css           # Homepage-specific styles
│   ├── properties.css      # Catalog & filter bar styles
│   ├── property-detail.css # Detail layout, gallery carousel & modal lightbox
│   ├── list-property.css   # Listing submission form & dropzone styles
│   └── contact.css         # Contact grid & office cards styles
├── js/
│   ├── nav.js              # Global mobile burger menu
│   ├── data.js             # Listing data & shared card renderer
│   ├── home.js             # Homepage featured listings
│   ├── properties.js       # Live catalog filtering & rendering
│   ├── property-detail.js  # Listing details, carousel & lightbox modal
│   ├── list-property.js    # Seller listing form & photo dropzone
│   └── contact.js          # Contact form validation & submission
├── fonts/                  # Sabrosa & Objectivity custom web fonts
└── images/                 # Brand assets & property photography
```

---

## Tech Stack

- **HTML5**: Semantic multi-page structure.
- **CSS3**: Custom properties, Flexbox, CSS Grid, custom `@font-face` typography (Sabrosa & Objectivity), fluid relative sizing (`rem`, `clamp()`).
- **JavaScript (ES6+)**: Zero-dependency modular client-side architecture (in-memory property store, DOM rendering, query-param routing, modal lightbox, carousels, responsive burger menu).

---

## Getting Started

Because Narrow Real Estate is built with zero external dependencies, no build steps or package managers (`npm`/`yarn`) are needed.

### Running Locally

You can serve the static files using Python's built-in HTTP server:

```bash
# Start local server on port 8000
python3 -m http.server 8000
```

Then open your browser at:
```
http://localhost:8000/
```

Or open `index.html` directly in any modern web browser.
