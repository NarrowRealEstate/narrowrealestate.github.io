// data.js - Data source and shared rendering helpers for properties
const propertiesData = [
  {
    id: 1,
    badge: "House & Lot",
    mls: "MLS #000001",
    yearBuilt: 2024,
    thumbnail: "images/MLS000001/01.webp",
    images: [
      "images/MLS000001/01.jpg",
      "images/MLS000001/02.jpg",
      "images/MLS000001/03.jpg"
    ],
    title: "Sleek Modern House near Clark",
    location: "Angeles City, Pampanga",
    city: "Angeles City",
    price: 6500000,
    beds: 3,
    baths: 2,
    floorArea: 120,
    lotArea: 150,
    type: "House & Lot",
    description: `
      <p>Welcome to this brand new, meticulously designed modern minimalist home located just minutes away from the Clark Freeport Zone. Perfectly tailored for young professionals and growing families, this house blends contemporary aesthetics with practical everyday living.</p>
      <p>The open-concept ground floor maximizes natural light, featuring a spacious living area that seamlessly transitions into a sleek, modular kitchen. Upstairs, the master bedroom boasts an en-suite bathroom and a private balcony overlooking the quiet neighborhood.</p>
      <p>Situated in a secure, flood-free subdivision in Angeles City, you'll enjoy quick access to major expressways (NLEX/SCTEX), top-tier schools, shopping malls, and lifestyle hubs. Finding a place to call your own in Pampanga doesn't get much better than this.</p>
    `,
    features: [
      "1-Car Garage", "Modular Kitchen", "Spacious Living Area", "Landscaped Garden",
      "24/7 Security", "Balcony", "Built-in Cabinets", "Proximity to Clark",
      "Clubhouse Access", "Flood-Free Area"
    ],
    neighborhood: "Premium Subdivision, Angeles City",
    locationContext: "This property is strategically located 10 minutes away from Clark International Airport and SM City Clark. It offers immediate access to the MacArthur Highway, making commutes to San Fernando or Mabalacat straightforward and convenient.",
    agent: { name: "Raquel Rivera", initials: "RR", title: "Listing Agent" }
  },
  {
    id: 2,
    badge: "Condominium",
    mls: "MLS #882103",
    yearBuilt: 2022,
    thumbnail: "images/MLS882103/photo1.webp",
    images: ["images/MLS882103/photo1.jpg", "images/MLS882103/photo2.jpg", "images/MLS882103/photo3.jpg"],
    title: "Mid<span class=\"sans-hyphen\">-</span>Rise Studio Apartment",
    location: "City of San Fernando, Pampanga",
    city: "San Fernando",
    price: 3200000,
    beds: 1,
    baths: 1,
    floorArea: 35,
    lotArea: null,
    type: "Condominium",
    description: `
      <p>Experience sophisticated urban living in this designer mid-rise studio apartment situated in the vibrant provincial capital of San Fernando. Perfectly suited for young executives, medical professionals, or savvy rental investors, this turnkey residence delivers upscale metropolitan flair with low-maintenance luxury.</p>
      <p>The masterfully configured interior optimizes every square meter with an intuitive open layout. Highlights include rich herringbone flooring, an accent wall of painted white brick in the entryway foyer, and an elegant smoked-glass partition separating the living quarter from the bedroom suite. The sleek culinary corner features custom matte charcoal cabinetry, a quartz waterfall breakfast bar, and integrated European appliances.</p>
      <p>Residents enjoy exclusive access to mid-rise building amenities including an infinity lap pool, fitness gym, 24/7 concierge security, and secure card-key elevator access. Nestled in a prime commercial and heritage corridor in San Fernando, the unit is walking distance to premier shopping districts, financial centers, and dining hotspots.</p>
    `,
    features: [
      "Smoked Glass Partition", "Herringbone Wood Flooring", "Custom Matte Cabinetry",
      "Quartz Breakfast Bar", "Infinity Lap Pool", "Fitness Center",
      "24/7 Concierge Security", "Keycard Elevator Access", "Private Balcony",
      "High Rental Yield Potential"
    ],
    neighborhood: "San Agustin Commercial Hub, San Fernando",
    locationContext: "Positioned just 5 minutes from SM City Pampanga and Robinsons Starmills, with immediate access to the NLEX San Fernando Exit and Jose Abad Santos Avenue (JASA). Ideal for seamless commutes to Clark or Metro Manila.",
    agent: { name: "Raquel Rivera", initials: "RR", title: "Listing Agent" }
  },
  {
    id: 3,
    badge: "Townhouse",
    mls: "MLS #449212",
    yearBuilt: 2023,
    thumbnail: "images/MLS449212/01.webp",
    images: ["images/MLS449212/01.jpg", "images/MLS449212/02.jpg", "images/MLS449212/03.jpg"],
    title: "Contemporary Townhouse",
    location: "Mabalacat, Pampanga",
    city: "Mabalacat",
    price: 4100000,
    beds: 3,
    baths: 2,
    floorArea: 85,
    lotArea: 60,
    type: "Townhouse",
    description: `
      <p>Discover the timeless charm of European-inspired architecture fused with contemporary comfort in this newly built 3-bedroom townhouse in Mabalacat. Designed for modern families seeking warmth and character, this home stands out with its handsome brick facade, classic dormer rooflines, and private paved frontage.</p>
      <p>Inside, the home reveals an inviting, cozy living hall anchored by an authentic exposed-brick fireplace hearth with a solid timber mantelpiece—a rare architectural centerpiece that creates an unforgettable ambiance. The ground floor flows efficiently into the dining area and kitchen, while the upper level hosts three comfortable bedrooms filled with natural light from traditional multi-pane sash windows.</p>
      <p>Situated within a quiet, secured townhouse enclave in northern Pampanga, this property ensures peace of mind with 24-hour perimeter security and family-friendly paved walkways. Its proximity to Clark's northern corridors makes it an outstanding choice for those working in the Freeport or seeking rapid highway connections.</p>
    `,
    features: [
      "Exposed Brick Fireplace", "European Brownstone Facade", "Solid Timber Mantel",
      "1-Car Covered Carport", "Gated Townhouse Enclave", "24/7 Security",
      "Multi-Pane Sash Windows", "Dormer Roof Architecture", "Proximity to Clark North Gate",
      "Paved Community Walkways"
    ],
    neighborhood: "Santa Maria Valley, Mabalacat",
    locationContext: "Strategically positioned just 8 minutes from the SCTEX Mabiga Interchange and 12 minutes from the Clark Mabalacat Gate. Commuters benefit from direct access to MacArthur Highway and the Clark Freeport Zone.",
    agent: { name: "Raquel Rivera", initials: "RR", title: "Listing Agent" }
  },
  {
    id: 4,
    badge: "House & Lot",
    mls: "MLS #112094",
    yearBuilt: 2021,
    thumbnail: "images/MLS112094/01.webp",
    images: ["images/MLS112094/01.jpg", "images/MLS112094/02.jpg", "images/MLS112094/03.jpg"],
    title: "Spacious Family Home",
    location: "Mexico, Pampanga",
    city: "Mexico",
    price: 5800000,
    beds: 4,
    baths: 3,
    floorArea: 180,
    lotArea: 200,
    type: "House & Lot",
    description: `
      <p>Welcome to this stately, two-story Craftsman residence in the peaceful municipality of Mexico, Pampanga. Boasting an expansive 180 sqm floor area on a generous 200 sqm lot, this 4-bedroom home delivers the ideal blend of suburban tranquility, generous proportions, and timeless architectural grace for growing families.</p>
      <p>The welcoming entrance hall features elegant architectural pillars set on stacked stone plinths and gleaming hardwood floors throughout. The grand family great room is drenched in warm daylight through a panoramic bank of white-trimmed sash windows, complemented by a classic hearth fireplace, designer ceiling fan, and French doors that open directly onto the private landscaped rear garden.</p>
      <p>Located in a master-planned, flood-free residential subdivision in Mexico, homeowners enjoy wide paved roads, a secure 24/7 guarded gate, and clubhouse amenities. Positioned minutes away from eastern San Fernando and major commercial centers, it offers suburban serenity without sacrificing metropolitan convenience.</p>
    `,
    features: [
      "2-Car Garage with Driveway", "Craftsman Stone Accents", "Gleaming Hardwood Floors",
      "Sun-Drenched Great Room", "Classic Fireplace Mantels", "French Doors to Backyard",
      "Landscaped Front & Rear Lawn", "24/7 Guarded Gated Village", "Underground Drainage System",
      "Expansive 200 sqm Lot"
    ],
    neighborhood: "Lakeshore Enclave, Mexico",
    locationContext: "Located just 7 minutes from the NLEX Mexico Exit and 10 minutes from the bustling San Fernando city border. Offers quick transit to Marquee Mall, SM City Pampanga, and reputable private academies in Central Luzon.",
    agent: { name: "Raquel Rivera", initials: "RR", title: "Listing Agent" }
  },
  {
    id: 5,
    badge: "House & Lot",
    mls: "MLS #774391",
    yearBuilt: 2023,
    thumbnail: "images/MLS774391/01.webp",
    images: ["images/MLS774391/01.jpg", "images/MLS774391/02.jpg", "images/MLS774391/03.jpg"],
    title: "Contemporary Architectural Villa",
    location: "Porac, Pampanga",
    city: "Porac",
    price: 8800000,
    beds: 4,
    baths: 3,
    floorArea: 220,
    lotArea: 280,
    type: "House & Lot",
    description: `
      <p>Welcome to this striking contemporary architectural villa nestled among mature pine trees in the scenic highlands of Porac, Pampanga. Harmonizing modern cubist architecture with warm organic materials, this bespoke 4-bedroom sanctuary offers the ultimate blend of progressive luxury and tranquil natural surroundings.</p>
      <p>The ground floor welcomes you with an open-concept living hall finished in polished travertine stone tiles, anchored by a sleek flush-mounted contemporary fireplace and custom media millwork. Expansive floor-to-ceiling glass fenestrations bring lush green pine vistas indoors. Upstairs, spacious bedroom suites and a rooftop terrace pergola offer panoramic views of the surrounding estate and Porac mountains.</p>
      <p>Situated within an exclusive, master-planned gated enclave in Porac, residents enjoy 24/7 biometric security, underground utilities, and resort-grade amenities including a clubhouse and infinity lap pool. With convenient access to SCTEX and the Clark Freeport corridor, this residence offers an enviable mountain-resort lifestyle within easy reach of the region's premier business districts.</p>
    `,
    features: [
      "Architectural Brick & Timber Facade", "Travertine Stone Tile Flooring",
      "Modern Flush-Mounted Fireplace", "Rooftop Terrace with Pergola",
      "Floor-to-Ceiling Glass Walls", "2-Car Covered Carport",
      "Mature Pine Tree Surroundings", "24/7 Biometric Gated Security",
      "Underground Power & Utilities", "Clubhouse & Infinity Lap Pool"
    ],
    neighborhood: "Alviera Highlands, Porac",
    locationContext: "Strategically situated within Porac's premier Alviera master-planned estate, just 5 minutes from the SCTEX Porac Interchange and 15 minutes from Clark International Airport. Offers direct access to Subic-Clark-Tarlac corridors and premier international academies.",
    agent: { name: "Raquel Rivera", initials: "RR", title: "Listing Agent" }
  },
  {
    id: 6,
    badge: "House & Lot",
    mls: "MLS #558291",
    yearBuilt: 2020,
    thumbnail: "images/MLS558291/01.webp",
    images: ["images/MLS558291/01.jpg", "images/MLS558291/02.jpg", "images/MLS558291/03.jpg"],
    title: "Bungalow Retreat",
    location: "Bacolor, Pampanga",
    city: "Bacolor",
    price: 4800000,
    beds: 3,
    baths: 2,
    floorArea: 110,
    lotArea: 150,
    type: "House & Lot",
    description: `
      <p>Escape to this enchanting rustic bungalow retreat situated in the historic and peaceful town of Bacolor, Pampanga. Combining classic lodge aesthetics with warm countryside charm, this unique 3-bedroom haven offers an idyllic sanctuary for retirees, creative professionals, or families seeking a serene respite from urban bustle.</p>
      <p>The interior showcases breathtaking cathedral ceilings lined with exposed timber beams and rich pine-plank walls. The centerpiece grand living hall features a dramatic floor-to-ceiling masonry fireplace, wrought-iron chandelier, and a charming mezzanine loft. Adjacent to the hall, a tranquil timber sunroom with expansive floor-to-ceiling windows provides the ultimate reading lounge overlooking verdant trees.</p>
      <p>Set on a generous 150 sqm lot shaded by mature pine trees and tropical palms, the grounds include a sunny outdoor picnic patio and fenced perimeter. Located in a high-elevation, flood-free enclave of Bacolor, you are immersed in historic provincial charm while remaining only minutes away from San Fernando's bustling commercial amenities.</p>
    `,
    features: [
      "Cathedral Timber Ceilings", "Floor-to-Ceiling Masonry Hearth", "Pine-Clad Reading Sunroom",
      "Exposed Wood Loft Mezzanine", "Wrought Iron Chandelier", "Shaded Garden with Picnic Area",
      "Upper Private Balcony", "1-Car Carport", "Peaceful Heritage Enclave",
      "100% Flood-Free Location"
    ],
    neighborhood: "Heritage Pines Sanctuary, Bacolor",
    locationContext: "Conveniently located 8 minutes from the historic Bacolor town center and Don Honorio Ventura State University (DHVSU), and only 12 minutes from downtown San Fernando. Seamlessly connects via the Jose Abad Santos Avenue (JASA) and Mega Dike Access Road.",
    agent: { name: "Raquel Rivera", initials: "RR", title: "Listing Agent" }
  }
];

const formatPrice = (price) => '₱' + price.toLocaleString('en-US');

// Reusable card renderer for Home, Properties, and Similar grids
const renderProperties = (properties, container, pageType) => {
  container.innerHTML = '';

  if (properties.length === 0) {
    container.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 2.5rem; font-size: 1.125rem;">No properties match your search criteria.</p>';
    return;
  }

  const getThumbnail = (prop) => {
    if (prop.thumbnail) return prop.thumbnail;
    if (prop.images && prop.images.length > 0) {
      return prop.images[0].replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    return prop.image ? prop.image.replace(/\.(jpg|jpeg|png)$/i, '.webp') : 'images/MLS000001/01.webp';
  };

  properties.forEach(prop => {
    const badgeHtml = prop.badge ? `<span class="badge">${prop.badge}</span>` : '';
    const mainImg = getThumbnail(prop);
    const fallbackImg = (prop.images && prop.images.length > 0) ? prop.images[0] : (prop.image || 'images/MLS000001/01.jpg');
    let statsHtml = '';

    if (pageType === 'home') {
      statsHtml = `
        <div class="stat-item"><span>${prop.beds || 'N/A'}</span> Beds</div>
        <div class="stat-item"><span>${prop.baths || 'N/A'}</span> Baths</div>
        <div class="stat-item"><span>${prop.floorArea || 'N/A'}</span> sqm Floor</div>
        <div class="stat-item"><span>${prop.lotArea || 'N/A'}</span> sqm Lot</div>
      `;
    } else {
      statsHtml = `
        <div class="stat-item"><span>${prop.beds || 'N/A'}</span> BEDS</div>
        <div class="stat-item"><span>${prop.baths || 'N/A'}</span> BATHS</div>
        <div class="stat-item"><span>${prop.floorArea ? prop.floorArea + ' sqm' : 'N/A'}</span> FLOOR AREA</div>
        ${prop.lotArea ? `<div class="stat-item"><span>${prop.lotArea} sqm</span> LOT AREA</div>` : ''}
      `;
    }

    const cardHtml = `
      <div class="property-card">
        <div class="property-img-container">
          ${badgeHtml}
          <img src="${mainImg}" alt="${prop.title.replace(/<[^>]*>?/gm, '')}" onerror="this.onerror=null;this.src='${fallbackImg}'">
        </div>
        <div class="property-info">
          <h3>${prop.title}</h3>
          <div class="location">
            <span class="icon">📍</span> ${prop.location}
          </div>
          <div class="price">${formatPrice(prop.price)}</div>
          <div class="stats">
            ${statsHtml}
          </div>
          <a href="property-detail.html?id=${prop.id}" class="btn-view">View Property</a>
        </div>
      </div>
    `;

    container.insertAdjacentHTML('beforeend', cardHtml);
  });
};
