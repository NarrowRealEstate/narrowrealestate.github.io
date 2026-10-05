// data.js - Data source and shared rendering helpers for properties
const propertiesData = [
  {
    id: 1,
    badge: "House & Lot",
    mls: "MLS #000001",
    yearBuilt: 2024,
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
    images: ["images/house2.png", "images/house3.png", "images/house4.png"],
    title: "Mid<span class=\"sans-hyphen\">-</span>Rise Studio Apartment",
    location: "City of San Fernando, Pampanga",
    city: "San Fernando",
    price: 3200000,
    beds: 1,
    baths: 1,
    floorArea: 35,
    lotArea: null,
    type: "Condominium",
    description: "<p>A beautiful mid-rise studio apartment perfect for young professionals.</p>",
    features: ["Swimming Pool", "Gym", "24/7 Security", "Balcony"],
    neighborhood: "City Center, San Fernando",
    locationContext: "Located right in the heart of San Fernando.",
    agent: { name: "Raquel Rivera", initials: "RR", title: "Listing Agent" }
  },
  {
    id: 3,
    badge: "Townhouse",
    mls: "MLS #449212",
    yearBuilt: 2023,
    images: ["images/house3.png", "images/house1.png", "images/house2.png"],
    title: "Contemporary Townhouse",
    location: "Mabalacat, Pampanga",
    city: "Mabalacat",
    price: 4100000,
    beds: 3,
    baths: 2,
    floorArea: 85,
    lotArea: 60,
    type: "Townhouse",
    description: "<p>A contemporary townhouse offering great value and space for growing families.</p>",
    features: ["1-Car Garage", "Gated Community", "Modern Design"],
    neighborhood: "Quiet Suburb, Mabalacat",
    locationContext: "Easy access to NLEX.",
    agent: { name: "Raquel Rivera", initials: "RR", title: "Listing Agent" }
  },
  {
    id: 4,
    badge: "House & Lot",
    mls: "MLS #112094",
    yearBuilt: 2021,
    images: ["images/house4.png", "images/house5.png", "images/house6.png"],
    title: "Spacious Family Home",
    location: "Mexico, Pampanga",
    city: "Mexico",
    price: 5800000,
    beds: 4,
    baths: 3,
    floorArea: 180,
    lotArea: 200,
    type: "House & Lot",
    description: "<p>A large family home with massive yard space.</p>",
    features: ["2-Car Garage", "Large Garden", "Spacious Kitchen"],
    neighborhood: "Family Village, Mexico",
    locationContext: "Close to local markets and schools.",
    agent: { name: "Raquel Rivera", initials: "RR", title: "Listing Agent" }
  },
  {
    id: 5,
    badge: "Lot",
    mls: "MLS #774391",
    yearBuilt: "N/A",
    images: ["images/house5.png", "images/house1.png", "images/house3.png"],
    title: "Prime Residential Lot",
    location: "Porac, Pampanga",
    city: "Porac",
    price: 1500000,
    beds: null,
    baths: null,
    floorArea: null,
    lotArea: 200,
    type: "Lot",
    description: "<p>A prime residential lot ready for your dream home construction.</p>",
    features: ["Corner Lot", "Clubhouse Access", "Secured Area"],
    neighborhood: "Exclusive Estate, Porac",
    locationContext: "Near the new development zones in Porac.",
    agent: { name: "Raquel Rivera", initials: "RR", title: "Listing Agent" }
  },
  {
    id: 6,
    badge: "House & Lot",
    mls: "MLS #558291",
    yearBuilt: 2020,
    images: ["images/house6.png", "images/house2.png", "images/house4.png"],
    title: "Bungalow Retreat",
    location: "Bacolor, Pampanga",
    city: "Bacolor",
    price: 4800000,
    beds: 3,
    baths: 2,
    floorArea: 110,
    lotArea: 150,
    type: "House & Lot",
    description: "<p>A cozy bungalow retreat perfect for retirees or small families.</p>",
    features: ["Single Story", "Patio", "Renovated"],
    neighborhood: "Heritage Suburb, Bacolor",
    locationContext: "Peaceful environment rich in local history.",
    agent: { name: "Raquel Rivera", initials: "RR", title: "Listing Agent" }
  }
];

const formatPrice = (price) => '₱' + price.toLocaleString('en-US');

// Reusable card renderer for Home, Properties, and Similar grids
const renderProperties = (properties, container, pageType) => {
  container.innerHTML = '';

  if (properties.length === 0) {
    container.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 40px; font-size: 18px;">No properties match your search criteria.</p>';
    return;
  }

  properties.forEach(prop => {
    const badgeHtml = prop.badge ? `<span class="badge">${prop.badge}</span>` : '';
    const mainImg = prop.images && prop.images.length > 0 ? prop.images[0] : prop.image;
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
          <img src="${mainImg}" alt="${prop.title.replace(/<[^>]*>?/gm, '')}">
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
