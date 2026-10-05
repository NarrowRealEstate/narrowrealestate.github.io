// property-detail.js - Single property layout, gallery carousel, lightbox modal, and similar listings

const renderPropertyDetail = (container) => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10) || 1; 
  const prop = propertiesData.find(p => p.id === id);

  if (!prop) {
    container.innerHTML = '<div class="container" style="padding: 6.25rem 0; text-align:center;"><h2>Property not found.</h2><a href="properties.html">Back to Properties</a></div>';
    return;
  }

  const featuresList = prop.features.map(f => `<li>${f}</li>`).join('');

  // Generate fading stack images
  const galleryImagesHtml = prop.images.map((img, index) => 
    `<img src="${img}" alt="Property View ${index + 1}" class="gallery-img ${index === 0 ? 'active' : ''}" onclick="openModal()">`
  ).join('');

  const modalImagesHtml = prop.images.map((img, index) => 
    `<img src="${img}" alt="Fullscreen View ${index + 1}" class="modal-img ${index === 0 ? 'active' : ''}">`
  ).join('');

  const detailHtml = `
    <div class="container">
      <div class="back-link">
        <a href="properties.html">← Back to Properties</a>
      </div>

      <div class="detail-header-row">
        <div class="detail-header-left">
          <div class="detail-badges">
            <span class="badge-sale">FOR SALE</span>
            <span class="badge-mls">${prop.mls}</span>
          </div>
          <h1 id="detail-title">${prop.title}</h1>
          <div class="detail-location">
            <span class="icon">📍</span> ${prop.location}
          </div>
        </div>
        <div class="detail-header-right">
          <div class="asking-price-label">Asking Price</div>
          <div class="detail-price">${formatPrice(prop.price)}</div>
        </div>
      </div>

      <!-- Main Carousel (Fading Stack) -->
      <div class="detail-gallery">
        <button class="gallery-nav gallery-prev" onclick="changeSlide(-1)">&#10094;</button>
        ${galleryImagesHtml}
        <button class="gallery-nav gallery-next" onclick="changeSlide(1)">&#10095;</button>
      </div>

      <!-- Fullscreen Modal (Fading Stack) -->
      <div id="galleryModal" class="gallery-modal">
        <button class="modal-close" onclick="closeModal()">&times;</button>
        <div class="modal-content-wrapper">
          <button class="modal-nav modal-prev" onclick="changeSlide(-1)">&#10094;</button>
          ${modalImagesHtml}
          <button class="modal-nav modal-next" onclick="changeSlide(1)">&#10095;</button>
        </div>
      </div>

      <div class="detail-content-grid">
        <div class="detail-main-col">
          
          <div class="detail-box detail-stats">
            <div class="stat-block"><div class="stat-val">${prop.beds || 'N/A'}</div><div class="stat-lbl">Bedrooms</div></div>
            <div class="stat-block"><div class="stat-val">${prop.baths || 'N/A'}</div><div class="stat-lbl">Bathrooms</div></div>
            <div class="stat-block"><div class="stat-val">${prop.floorArea ? prop.floorArea + ' sqm' : 'N/A'}</div><div class="stat-lbl">Floor Area</div></div>
            <div class="stat-block"><div class="stat-val">${prop.lotArea ? prop.lotArea + ' sqm' : 'N/A'}</div><div class="stat-lbl">Lot Area</div></div>
            <div class="stat-block"><div class="stat-val">${prop.type}</div><div class="stat-lbl">Property Type</div></div>
            <div class="stat-block"><div class="stat-val">${prop.yearBuilt}</div><div class="stat-lbl">Year Built</div></div>
          </div>

          <div class="detail-box">
            <h3>Property Description</h3>
            ${prop.description}
          </div>

          <div class="detail-box">
            <h3>Features & Amenities</h3>
            <ul class="features-list">
              ${featuresList}
            </ul>
          </div>

          <div class="detail-box">
            <h3>Location Context</h3>
            <div class="loc-context-inner">
              <p><strong>Neighborhood:</strong> ${prop.neighborhood}</p>
              <br>
              <p>${prop.locationContext}</p>
            </div>
          </div>

        </div>

        <aside class="detail-sidebar">
          <div class="detail-box">
            <div class="agent-header">
              <div class="agent-avatar">${prop.agent.initials}</div>
              <div>
                <div class="agent-name">${prop.agent.name}</div>
                <div class="agent-title">${prop.agent.title}</div>
              </div>
            </div>
            
            <form class="inquiry-form" onsubmit="event.preventDefault(); alert('Inquiry Sent!');">
              <h3>Inquire About This Property</h3>
              <div class="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Juan Dela Cruz" required>
              </div>
              <div class="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="juan@narrowrealestate.ph" required>
              </div>
              <div class="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="0917 123 4567" required>
              </div>
              <div class="form-group">
                <label>Message</label>
                <textarea required>I am interested in the ${prop.title.replace(/<[^>]*>?/gm, '')}. Please contact me with more information.</textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-submit">Send Inquiry</button>
            </form>
          </div>
        </aside>
      </div>

      <section class="similar-properties">
        <h2>Similar Properties</h2>
        <div class="similar-grid" id="similar-properties-grid"></div>
      </section>

    </div>
  `;

  container.innerHTML = detailHtml;

  // Carousel logic attached directly to window for inline onclick execution
  let currentSlide = 0;
  const totalSlides = prop.images.length;

  window.changeSlide = function(direction) {
    const galleryImages = document.querySelectorAll('.detail-gallery .gallery-img');
    const modalImages = document.querySelectorAll('#galleryModal .modal-img');

    // Remove active state
    galleryImages[currentSlide].classList.remove('active');
    modalImages[currentSlide].classList.remove('active');

    currentSlide += direction;
    
    // Circular logic
    if (currentSlide >= totalSlides) {
      currentSlide = 0;
    } else if (currentSlide < 0) {
      currentSlide = totalSlides - 1;
    }

    // Add active state to crossfade the new image in
    galleryImages[currentSlide].classList.add('active');
    modalImages[currentSlide].classList.add('active');
  };

  window.openModal = function() {
    document.getElementById('galleryModal').classList.add('active');
  };

  window.closeModal = function() {
    document.getElementById('galleryModal').classList.remove('active');
  };

  // Render 2 similar properties (excluding the current one)
  const similarGrid = document.getElementById('similar-properties-grid');
  const similarProps = propertiesData.filter(p => p.id !== id && p.type === prop.type).slice(0, 2);
  
  if (similarProps.length < 2) {
    const fallback = propertiesData.filter(p => p.id !== id && !similarProps.includes(p));
    similarProps.push(...fallback.slice(0, 2 - similarProps.length));
  }

  renderProperties(similarProps, similarGrid, 'properties');
};

document.addEventListener('DOMContentLoaded', () => {
  const detailContainer = document.getElementById('property-detail-container');
  if (detailContainer && typeof propertiesData !== 'undefined' && typeof renderProperties === 'function') {
    renderPropertyDetail(detailContainer);
  }
});
