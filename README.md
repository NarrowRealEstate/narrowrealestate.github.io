# Narrow Real Estate

A clean, modern, zero-dependency real estate listing and discovery platform focused on premier properties across Pampanga, Philippines (Angeles City, Bacolor, San Fernando, Mabalacat, Mexico, and Porac).

---

## Demo Approved Seller Credentials

To access the private **Approved Seller Portal** (`seller-login.html`), use either of the pre-configured demo seller accounts:

| Seller Name | Seller ID / Email | Password | Portfolio Overview |
| :--- | :--- | :--- | :--- |
| **Elena Vance** | `#SEL-8821`<br>or `elena@vance.ph` | `password123` | **2 Listings** (MLS #882103 in Angeles City, MLS #882104 in San Fernando)<br>• 4 Buyer Inquiries<br>• ₱25,000,000 Total Portfolio Value |
| **Marcus Reyes** | `#SEL-4412`<br>or `marcus@reyes.ph` | `password123` | **1 Listing** (MLS #449212 in San Fernando)<br>• 2 Buyer Inquiries<br>• ₱12,800,000 Total Portfolio Value |

> **Note**: Sessions are persisted locally in `localStorage` (`narrow_seller_session`). Once authenticated, visiting `seller-login.html` will automatically route to the seller dashboard (`seller-listings.html`) until you click **Log Out**.

---

## Features & Pages

- **Home (`index.html`)**:
  - Full-viewport hero banner with branded typography and quick CTA actions.
  - Curated showcase of top 3 featured listings with reactive property cards.
  - "Why Narrow" core value propositions and high-conversion consultation banner.
  - Global footer featuring automated white logo inversion for contrast on dark backgrounds.
- **Properties Catalog (`properties.html`)**:
  - Real-time multi-criteria filter engine (Location, Property Type, Max Price, Min Bedrooms) with instant DOM updates and no page reload required.
  - Responsive catalog grid displaying standard badges, signature red price formatting, and 4-metric specification summaries.
  - Clean empty state fallback with reset guidance when no properties match the selected criteria.
- **Property Detail (`property-detail.html`)**:
  - Dynamic single-listing view driven by query string routing (`property-detail.html?id=<id>`).
  - Interactive multi-photo carousel with smooth crossfade animations and thumbnail indicators.
  - Full-screen gallery lightbox modal dialog (`role="dialog" aria-modal="true"`).
  - Detailed architectural specifications (Lot Area, Floor Area, Year Built, Bedrooms, Bathrooms, MLS ID).
  - Verified amenities list, detailed neighborhood and transit context, and direct listing agent inquiry form.
  - "Similar Properties" recommendations dynamically matching the listing's property type.
- **List Your Property (`list-property.html`)**:
  - Step-by-step submission form for property owners covering seller contacts, property specs, and pricing.
  - Interactive drag-and-drop photo upload dropzone with individual file chip management and removal.
  - Accessible client-side confirmation modal dialog on submission.
  - State persistence: submitted properties sync automatically to `localStorage` (`narrow_submitted_listings`) and hydrate dynamically into Elena Vance's seller dashboard.
- **Approved Seller Portal Sign-In (`seller-login.html`)**:
  - Secure seller sign-in interface validating against approved seller credentials.
  - Show/hide password visibility toggle with interactive emoji state (`👁️` / `🙈`).
  - Animated error alert banner (`#loginErrorAlert`) providing immediate user feedback on invalid credentials.
  - Direct links to listing submission for new sellers and contact support for password recovery.
- **Approved Seller Dashboard (`seller-listings.html`)**:
  - Profile header displaying seller initials, verified seller badge, email, and ID.
  - Key Performance Indicator (KPI) metric cards: Active Listings, Pending Deals, Total Buyer Leads, and Total Portfolio Value.
  - Instant text search across MLS IDs, titles, and cities combined with status tab filters (`All`, `Active`, `Under Contract`, `Sold`, `Pending Review`).
  - Redesigned horizontal listing cards matching the visual hierarchy, typography, signature red price, and 4-metric stat bar (`BEDS`, `BATHS`, `FLOOR AREA`, `LOT AREA`) of the public catalog.
  - Minimal vector SVG iconography across the entire dashboard (zero emojis).
  - Multi-device responsive architecture:
    - **Tablet (`<= 62em`)**: Filter tabs and search bar neatly aligned on the same row; card action buttons positioned in the body; performance metrics moved to a dedicated full-width bottom row.
    - **Mobile (`<= 48em`)**: Tightened seller card spacing, nested search lens icon, full-width touch buttons, and bottom-anchored performance metrics info.
  - **Buyer Inquiries Viewer Modal**: Dedicated dialog to view prospective buyer leads, contact info, timestamps, messages, and direct reply links (`mailto:` / `tel:`).
  - **Manage Listing Modal**: Interactive editor for listing status and asking price, featuring live comma-separated numeric formatting, fixed `₱` currency prefix, and instant sync to `localStorage`.
  - Sabrosa font glyph patch: Objectivity (`var(--font-main)`) is applied to all numeric counts and statistics to prevent font glyph substitution errors.
- **Contact Us (`contact.html`)**:
  - Dedicated buyer and seller inquiry channels, physical Pampanga office address, telephone lines, and operating hours.
  - Client-side validated contact inquiry form with confirmation feedback modal dialog.

---

## Directory Structure

```
Narrow/
├── index.html              # Homepage
├── properties.html         # Catalog & Live Search
├── property-detail.html    # Single Property View & Gallery Lightbox
├── list-property.html      # Seller Property Listing Form
├── seller-login.html       # Approved Seller Sign-In Page
├── seller-listings.html    # Approved Seller Dashboard
├── contact.html            # Contact & Office Information
├── css/
│   ├── styles.css          # Global styles, variables, typography, navigation & footer
│   ├── index.css           # Homepage-specific styles
│   ├── properties.css      # Catalog & filter bar styles
│   ├── property-detail.css # Detail layout, gallery carousel & modal lightbox
│   ├── list-property.css   # Listing submission form & dropzone styles
│   ├── seller-login.css    # Seller sign-in card, password toggle & alert banner
│   ├── seller-listings.css # Seller dashboard, KPI cards & inquiries modal
│   └── contact.css         # Contact grid & office cards styles
├── js/
│   ├── nav.js              # Global mobile burger menu toggle
│   ├── data.js             # Listing data store & shared card renderer
│   ├── home.js             # Homepage featured listings renderer
│   ├── properties.js       # Live catalog filtering & rendering engine
│   ├── property-detail.js  # Listing details, carousel & lightbox modal
│   ├── list-property.js    # Seller listing form & photo dropzone
│   ├── seller-login.js     # Seller authentication & session handler
│   ├── seller-listings.js  # Seller dashboard controller & inquiries modal
│   └── contact.js          # Contact form validation & submission
├── fonts/
│   ├── objectivity/        # Geometric sans-serif font family (woff2) - Primary text font
│   └── sabrosa/            # Display/Editorial serif font family (ttf) - Headings & brand text
├── images/                 # Brand logos, hero backgrounds & property photography
│   ├── hero.png
│   ├── narrow.png
│   ├── MLS000001/          # Property 1 photography (01.jpg, 02.jpg, 03.jpg)
│   ├── MLS112094/          # Property 4 photography (01.jpg, 02.jpg, 03.jpg)
│   ├── MLS449212/          # Property 3 photography (01.jpg, 02.jpg, 03.jpg)
│   ├── MLS558291/          # Property 6 photography (01.jpg, 02.jpg, 03.jpg)
│   ├── MLS774391/          # Property 5 photography (01.jpg, 02.jpg, 03.jpg)
│   └── MLS882103/          # Property 2 photography (photo1.jpg, photo2.jpg, photo3.jpg)
├── README.md               # User-facing documentation and demo credentials
└── AGENTS.md               # Authoritative developer & AI reference guide
```

---

## Technical Standards & Architecture

- **Zero-Dependency Architecture**: Built entirely with Vanilla HTML5, CSS3, and ES6+ JavaScript. No npm packages, build tools, or external UI libraries.
- **Strict Zero-Pixel Standard**: All stylesheets and inline templates strictly utilize relative units (`rem`, `em`, `clamp()`, `%`, `vw`). There are **0 hardcoded `px` occurrences** across all 8 stylesheets.
- **Typography System**:
  - **Editorial Serif (`Sabrosa`)**: Headings (`h1`, `h2`, `h3`, `h4`) and brand text for an upscale aesthetic.
  - **Geometric Sans-Serif (`Objectivity`)**: Body copy, UI labels, numeric statistics, buttons, inputs, and form controls for optimal legibility.
- **Accessible Modals**: Every modal dialog implements `role="dialog" aria-modal="true"`. Visibility is controlled via CSS transitions (`visibility: hidden / visible; opacity: 0 / 1`) rather than static `aria-hidden` attributes to avoid accessibility conflicts.
- **Client-Side Persistence**:
  - `narrow_seller_session`: Persists the logged-in seller session.
  - `narrow_submitted_listings`: Persists properties submitted via `list-property.html`.
  - `narrow_seller_listings_<sellerKey>`: Persists price and status edits from the Manage Listing modal.

---

## Getting Started

Because Narrow Real Estate has zero external dependencies, no build steps, bundlers, or package managers (`npm`/`yarn`) are required.

### Running Locally

Serve the repository root using any static HTTP server. For example, using Python's built-in server:

```bash
# Start local preview server on port 8000
python3 -m http.server 8000
```

Then visit:
```
http://localhost:8000/
```

Or open `index.html` directly in any modern browser.

---

## Quality & Verification Workflows

To ensure codebase integrity, run the following verification checks:

```bash
# 1. Validate JavaScript syntax across all modular scripts
node -c js/*.js

# 2. Verify strict zero-pixel standard across all stylesheets
for f in css/*.css; do echo -n "$f: "; grep -o -E '[0-9]+px' "$f" | wc -l; done

# 3. Check for trailing whitespace across HTML, CSS, and JS files
grep -n '[[:blank:]]$' *.html css/*.css js/*.js
```
