// seller-listings.js - Approved Sellers Listings Management Controller

document.addEventListener('DOMContentLoaded', () => {
  // Mock Database for Approved Sellers
  const mockSellersData = {
    elena: {
      id: 'elena',
      name: 'Elena Vance',
      initials: 'EV',
      sellerId: '#SEL-8821',
      memberSince: 'March 2024',
      agent: 'Raquel Rivera (Narrow RE)',
      listings: [
        {
          id: 1,
          mls: 'MLS #000001',
          title: 'Sleek Modern House near Clark',
          location: 'Angeles City, Pampanga',
          city: 'Angeles City',
          price: 6500000,
          beds: 3,
          baths: 2,
          floorArea: 120,
          lotArea: 150,
          type: 'House & Lot',
          images: ['images/MLS000001/01.jpg'],
          status: 'Active',
          views: 428,
          daysOnMarket: 14,
          inquiries: [
            {
              id: 101,
              name: 'Maria Santos',
              email: 'maria.santos@gmail.com',
              phone: '0918 234 5678',
              date: 'Oct 4, 2026',
              message: 'Hi! We are pre-approved for bank financing and would love to schedule a private tour this Saturday at 2:00 PM.'
            },
            {
              id: 102,
              name: 'Carl Dizon',
              email: 'carl.dizon@techcorp.ph',
              phone: '0920 987 6543',
              date: 'Oct 2, 2026',
              message: 'Is the price negotiable if we settle with a spot cash down payment? Looking forward to your response.'
            },
            {
              id: 103,
              name: 'Jessica Lim',
              email: 'jessicalim@yahoo.com',
              phone: '0917 555 4321',
              date: 'Sep 28, 2026',
              message: 'Does the subdivision clubhouse have a swimming pool and playground for kids? Very interested in the property.'
            }
          ]
        },
        {
          id: 201,
          mls: 'MLS #000201',
          title: 'Urban Executive Loft near SM Telabastagan',
          location: 'City of San Fernando, Pampanga',
          city: 'San Fernando',
          price: 4200000,
          beds: 2,
          baths: 2,
          floorArea: 68,
          lotArea: null,
          type: 'Condominium',
          images: ['images/02.jpg'],
          status: 'Active',
          views: 289,
          daysOnMarket: 22,
          inquiries: [
            {
              id: 104,
              name: 'Brandon Lee',
              email: 'brandon.lee@gmail.com',
              phone: '0915 333 8899',
              date: 'Oct 3, 2026',
              message: 'Hello Elena, are pets allowed in this condominium unit? Would love to know the HOA monthly dues as well.'
            }
          ]
        },
        {
          id: 202,
          mls: 'MLS #PENDING-01',
          title: 'Contemporary Bungalow with Garden',
          location: 'Bacolor, Pampanga',
          city: 'Bacolor',
          price: 3800000,
          beds: 3,
          baths: 2,
          floorArea: 95,
          lotArea: 180,
          type: 'House & Lot',
          images: ['images/MLS000001/02.jpg'],
          status: 'Pending Review',
          views: 0,
          daysOnMarket: 2,
          inquiries: []
        }
      ]
    },
    marcus: {
      id: 'marcus',
      name: 'Marcus Reyes',
      initials: 'MR',
      sellerId: '#SEL-4412',
      memberSince: 'January 2025',
      agent: 'Raquel Rivera (Narrow RE)',
      listings: [
        {
          id: 301,
          mls: 'MLS #000301',
          title: 'Villa Monte Maria Two-Story Residence',
          location: 'Porac, Pampanga',
          city: 'Porac',
          price: 8900000,
          beds: 4,
          baths: 3,
          floorArea: 185,
          lotArea: 220,
          type: 'House & Lot',
          images: ['images/MLS000001/03.jpg'],
          status: 'Under Contract',
          views: 612,
          daysOnMarket: 45,
          inquiries: [
            {
              id: 105,
              name: 'Patricia Ramos',
              email: 'patricia.r@consulting.ph',
              phone: '0917 888 1234',
              date: 'Sep 20, 2026',
              message: 'Offer submitted through agent Raquel. Ready for formal deed of sale and contract signing.'
            }
          ]
        }
      ]
    },
    new_seller: {
      id: 'new_seller',
      name: 'Demo New Seller',
      initials: 'NS',
      sellerId: '#SEL-9901',
      memberSince: 'October 2026',
      agent: 'Raquel Rivera (Narrow RE)',
      listings: []
    }
  };

  // Verify Authenticated Session
  const sessionRaw = localStorage.getItem('narrow_seller_session');
  if (!sessionRaw) {
    window.location.replace('seller-login.html');
    return;
  }

  let sessionUser;
  try {
    sessionUser = JSON.parse(sessionRaw);
    if (!sessionUser || !sessionUser.key) {
      throw new Error('Invalid session payload');
    }
  } catch (e) {
    localStorage.removeItem('narrow_seller_session');
    window.location.replace('seller-login.html');
    return;
  }

  const currentSellerKey = sessionUser.key;
  let currentStatusFilter = 'all';
  let currentSearchQuery = '';

  // DOM Elements
  const btnSellerLogout = document.getElementById('btnSellerLogout');
  const sellerAvatar = document.getElementById('seller-avatar');
  const sellerName = document.getElementById('seller-name');
  const sellerIdText = document.getElementById('seller-id-text');
  const sellerSinceText = document.getElementById('seller-since-text');

  const kpiActive = document.getElementById('kpi-active');
  const kpiPending = document.getElementById('kpi-pending');
  const kpiInquiries = document.getElementById('kpi-inquiries');
  const kpiValue = document.getElementById('kpi-value');

  const tabCountAll = document.getElementById('tab-count-all');
  const tabCountActive = document.getElementById('tab-count-active');
  const tabCountPending = document.getElementById('tab-count-pending');
  const tabCountContract = document.getElementById('tab-count-contract');

  const listingsContainer = document.getElementById('seller-listings-container');
  const searchInput = document.getElementById('seller-search-input');
  const tabButtons = document.querySelectorAll('.status-tabs .tab-btn');

  // Modals
  const inquiriesModal = document.getElementById('inquiriesModal');
  const inquiriesModalTitle = document.getElementById('inquiriesModalTitle');
  const inquiriesModalSubtitle = document.getElementById('inquiriesModalSubtitle');
  const inquiriesListContainer = document.getElementById('inquiriesListContainer');
  const btnCloseInquiriesModal = document.getElementById('btnCloseInquiriesModal');
  const btnDismissInquiriesModal = document.getElementById('btnDismissInquiriesModal');

  const manageModal = document.getElementById('manageModal');
  const manageModalTitle = document.getElementById('manageModalTitle');
  const manageModalSubtitle = document.getElementById('manageModalSubtitle');
  const manageListingForm = document.getElementById('manageListingForm');
  const managePropertyId = document.getElementById('managePropertyId');
  const managePrice = document.getElementById('managePrice');
  const manageStatus = document.getElementById('manageStatus');
  const btnCloseManageModal = document.getElementById('btnCloseManageModal');
  const btnCancelManageModal = document.getElementById('btnCancelManageModal');

  // Load and sync seller listings with localStorage
  const getSellerListings = (sellerKey) => {
    const storageKey = `narrow_seller_listings_${sellerKey}`;
    const saved = localStorage.getItem(storageKey);
    let listings = [];

    if (saved) {
      try {
        listings = JSON.parse(saved);
      } catch (e) {
        listings = mockSellersData[sellerKey] ? [...mockSellersData[sellerKey].listings] : [];
      }
    } else if (mockSellersData[sellerKey]) {
      listings = [...mockSellersData[sellerKey].listings];
    }

    // Merge any newly submitted properties from list-property.html into Elena's account
    if (sellerKey === 'elena') {
      const submittedRaw = localStorage.getItem('narrow_submitted_listings');
      if (submittedRaw) {
        try {
          const submittedList = JSON.parse(submittedRaw);
          submittedList.forEach(submitted => {
            if (!listings.some(item => item.id === submitted.id)) {
              listings.unshift(submitted);
            }
          });
        } catch (e) {
          console.error('Error loading submitted listings', e);
        }
      }
    }

    return listings;
  };

  const saveSellerListings = (sellerKey, listings) => {
    const storageKey = `narrow_seller_listings_${sellerKey}`;
    localStorage.setItem(storageKey, JSON.stringify(listings));
  };

  // Safe price formatter
  const safeFormatPrice = (price) => {
    if (typeof formatPrice === 'function') {
      return formatPrice(price);
    }
    return '₱' + Number(price || 0).toLocaleString('en-US');
  };

  // Render KPIs & Tab Counts
  const updateKPIs = (listings) => {
    let active = 0;
    let pending = 0;
    let contract = 0;
    let totalInquiries = 0;
    let totalValue = 0;

    listings.forEach(item => {
      const status = item.status || 'Active';
      if (status === 'Active') {
        active++;
        totalValue += Number(item.price || 0);
      } else if (status === 'Pending Review') {
        pending++;
      } else if (status === 'Under Contract' || status === 'Sold') {
        contract++;
        totalValue += Number(item.price || 0);
      }

      if (Array.isArray(item.inquiries)) {
        totalInquiries += item.inquiries.length;
      }
    });

    if (kpiActive) kpiActive.textContent = active;
    if (kpiPending) kpiPending.textContent = pending;
    if (kpiInquiries) kpiInquiries.textContent = totalInquiries;
    if (kpiValue) kpiValue.textContent = safeFormatPrice(totalValue);

    if (tabCountAll) tabCountAll.textContent = listings.length;
    if (tabCountActive) tabCountActive.textContent = active;
    if (tabCountPending) tabCountPending.textContent = pending;
    if (tabCountContract) tabCountContract.textContent = contract;
  };

  // Render Listing Cards
  const renderListings = () => {
    const allListings = getSellerListings(currentSellerKey);
    updateKPIs(allListings);

    // Apply Filter and Search
    const filtered = allListings.filter(item => {
      // Status filter
      let matchesStatus = true;
      if (currentStatusFilter === 'Active') {
        matchesStatus = item.status === 'Active';
      } else if (currentStatusFilter === 'Pending Review') {
        matchesStatus = item.status === 'Pending Review';
      } else if (currentStatusFilter === 'Under Contract') {
        matchesStatus = item.status === 'Under Contract' || item.status === 'Sold';
      }

      // Search filter
      let matchesSearch = true;
      if (currentSearchQuery.trim() !== '') {
        const query = currentSearchQuery.toLowerCase();
        const titleMatch = (item.title || '').toLowerCase().includes(query);
        const mlsMatch = (item.mls || '').toLowerCase().includes(query);
        const cityMatch = (item.city || item.location || '').toLowerCase().includes(query);
        matchesSearch = titleMatch || mlsMatch || cityMatch;
      }

      return matchesStatus && matchesSearch;
    });

    listingsContainer.innerHTML = '';

    if (filtered.length === 0) {
      listingsContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📂</div>
          <h3>No listings found</h3>
          <p>We couldn't find any properties matching your current filter criteria.</p>
          <a href="list-property.html" class="btn btn-primary">List a New Property</a>
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const status = item.status || 'Active';
      let statusClass = 'status-active';
      if (status === 'Pending Review') statusClass = 'status-pending';
      else if (status === 'Under Contract') statusClass = 'status-contract';
      else if (status === 'Sold') statusClass = 'status-sold';

      const imgSrc = (item.images && item.images.length > 0) ? item.images[0] : 'images/MLS000001/01.jpg';
      const cleanTitle = (item.title || 'Untitled Property').replace(/<[^>]*>?/gm, '');
      const inquiriesCount = Array.isArray(item.inquiries) ? item.inquiries.length : 0;
      const viewsCount = item.views !== undefined ? item.views : 0;
      const days = item.daysOnMarket !== undefined ? item.daysOnMarket : 1;

      // Specs
      const bedsDisplay = item.beds ? `${item.beds} Beds` : 'N/A Beds';
      const bathsDisplay = item.baths ? `${item.baths} Baths` : 'N/A Baths';
      const floorDisplay = item.floorArea ? `${item.floorArea} sqm Floor` : '';
      const lotDisplay = item.lotArea ? `${item.lotArea} sqm Lot` : '';

      const card = document.createElement('article');
      card.className = 'seller-card';
      card.innerHTML = `
        <div class="card-media">
          <img src="${imgSrc}" alt="${cleanTitle}" onerror="this.src='images/MLS000001/01.jpg'">
          <span class="card-badge-status ${statusClass}">${status}</span>
        </div>

        <div class="card-details">
          <div class="card-top-row">
            <span class="mls-tag">${item.mls || 'MLS #PENDING'}</span>
            <span class="property-type-tag">${item.type || 'Property'}</span>
          </div>
          <h3>${item.title || 'Untitled Property'}</h3>
          <div class="card-location">
            <span>📍</span> ${item.location || 'Pampanga'}
          </div>
          <div class="card-specs">
            <span class="spec-item">🛏️ <strong>${bedsDisplay}</strong></span>
            <span class="spec-item">🚿 <strong>${bathsDisplay}</strong></span>
            ${floorDisplay ? `<span class="spec-item">📐 <strong>${floorDisplay}</strong></span>` : ''}
            ${lotDisplay ? `<span class="spec-item">🌿 <strong>${lotDisplay}</strong></span>` : ''}
          </div>
          <div class="card-metrics-row">
            <span>👁️ <strong>${viewsCount}</strong> Total Views</span>
            <span class="metric-highlight">💬 <strong>${inquiriesCount}</strong> Buyer Inquiries</span>
            <span>📅 <strong>${days}</strong> Days on Market</span>
          </div>
        </div>

        <div class="card-sidebar">
          <div class="card-price">${safeFormatPrice(item.price)}</div>
          <div class="card-actions">
            <button type="button" class="btn-card btn-inquiries" data-action="inquiries" data-id="${item.id}">
              💬 View Inquiries (${inquiriesCount})
            </button>
            <button type="button" class="btn-card btn-manage" data-action="manage" data-id="${item.id}">
              ⚙️ Manage Listing
            </button>
            ${status === 'Active' ? `
              <a href="property-detail.html?id=${item.id}" target="_blank" class="btn-card btn-view-public">
                View Public Page ↗
              </a>
            ` : `
              <span class="btn-card btn-view-public" style="opacity: 0.6; cursor: default;">
                ${status === 'Pending Review' ? 'Pending Approval' : status}
              </span>
            `}
          </div>
        </div>
      `;

      listingsContainer.appendChild(card);
    });

    // Attach Event Listeners to Card Buttons
    listingsContainer.querySelectorAll('[data-action="inquiries"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openInquiriesModal(id);
      });
    });

    listingsContainer.querySelectorAll('[data-action="manage"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openManageModal(id);
      });
    });
  };

  // Open Inquiries Modal
  const openInquiriesModal = (propertyId) => {
    const listings = getSellerListings(currentSellerKey);
    const property = listings.find(item => String(item.id) === String(propertyId));
    if (!property) return;

    const cleanTitle = (property.title || '').replace(/<[^>]*>?/gm, '');
    inquiriesModalTitle.textContent = `Buyer Inquiries (${property.inquiries ? property.inquiries.length : 0})`;
    inquiriesModalSubtitle.textContent = cleanTitle;

    inquiriesListContainer.innerHTML = '';

    if (!property.inquiries || property.inquiries.length === 0) {
      inquiriesListContainer.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem; color: var(--text-gray);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📭</div>
          <p><strong>No buyer inquiries yet.</strong></p>
          <p style="font-size: 0.875rem;">Prospective buyers who contact your listing agent or send inquiries through the detail page will appear here.</p>
        </div>
      `;
    } else {
      property.inquiries.forEach(inquiry => {
        const card = document.createElement('div');
        card.className = 'inquiry-lead-card';
        card.innerHTML = `
          <div class="inquiry-lead-header">
            <div class="lead-name-group">
              <div class="lead-avatar">${inquiry.name.slice(0, 2).toUpperCase()}</div>
              <div>
                <div class="lead-name">${inquiry.name}</div>
                <div class="lead-date">${inquiry.date}</div>
              </div>
            </div>
            <div class="inquiry-contact-links">
              <a href="mailto:${inquiry.email}" class="inquiry-link">✉️ ${inquiry.email}</a>
              <a href="tel:${inquiry.phone.replace(/[^0-9+]/g, '')}" class="inquiry-link">📞 ${inquiry.phone}</a>
            </div>
          </div>
          <div class="inquiry-message">${inquiry.message}</div>
        `;
        inquiriesListContainer.appendChild(card);
      });
    }

    inquiriesModal.classList.add('active');
  };

  const closeInquiriesModal = () => {
    inquiriesModal.classList.remove('active');
  };

  if (btnCloseInquiriesModal) btnCloseInquiriesModal.addEventListener('click', closeInquiriesModal);
  if (btnDismissInquiriesModal) btnDismissInquiriesModal.addEventListener('click', closeInquiriesModal);
  if (inquiriesModal) {
    inquiriesModal.addEventListener('click', (e) => {
      if (e.target === inquiriesModal) closeInquiriesModal();
    });
  }

  // Open Manage Modal
  const openManageModal = (propertyId) => {
    const listings = getSellerListings(currentSellerKey);
    const property = listings.find(item => String(item.id) === String(propertyId));
    if (!property) return;

    managePropertyId.value = property.id;
    managePrice.value = (property.price || 0).toLocaleString('en-US');
    manageStatus.value = property.status || 'Active';

    const cleanTitle = (property.title || '').replace(/<[^>]*>?/gm, '');
    manageModalTitle.textContent = 'Manage Listing';
    manageModalSubtitle.textContent = cleanTitle;

    manageModal.classList.add('active');
  };

  const closeManageModal = () => {
    manageModal.classList.remove('active');
  };

  if (btnCloseManageModal) btnCloseManageModal.addEventListener('click', closeManageModal);
  if (btnCancelManageModal) btnCancelManageModal.addEventListener('click', closeManageModal);
  if (manageModal) {
    manageModal.addEventListener('click', (e) => {
      if (e.target === manageModal) closeManageModal();
    });
  }

  // Real-time comma formatting for asking price input
  if (managePrice) {
    managePrice.addEventListener('input', () => {
      managePrice.setCustomValidity('');
      const prevVal = managePrice.value;
      const cursor = managePrice.selectionStart || 0;
      const rawDigits = prevVal.replace(/\D/g, '');

      if (!rawDigits) {
        managePrice.value = '';
        return;
      }

      const formatted = Number(rawDigits).toLocaleString('en-US');
      const digitsBeforeCursor = prevVal.slice(0, cursor).replace(/\D/g, '').length;

      managePrice.value = formatted;

      // Recalculate cursor position to prevent cursor jump
      let newCursor = 0;
      let countedDigits = 0;
      for (let i = 0; i < formatted.length; i++) {
        if (/\d/.test(formatted[i])) countedDigits++;
        if (countedDigits === digitsBeforeCursor) {
          newCursor = i + 1;
          break;
        }
      }
      if (digitsBeforeCursor === 0) newCursor = 0;
      managePrice.setSelectionRange(newCursor, newCursor);
    });
  }

  // Manage Form Submit (Save changes to localStorage)
  if (manageListingForm) {
    manageListingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = managePropertyId.value;
      const rawPrice = managePrice.value.replace(/\D/g, '');
      const updatedPrice = rawPrice ? parseInt(rawPrice, 10) : 0;

      if (updatedPrice < 100000) {
        managePrice.setCustomValidity('Please enter an asking price of at least ₱100,000.');
        managePrice.reportValidity();
        return;
      }
      const updatedStatus = manageStatus.value;

      const listings = getSellerListings(currentSellerKey);
      const target = listings.find(item => String(item.id) === String(id));
      if (target) {
        target.price = updatedPrice;
        target.status = updatedStatus;
        saveSellerListings(currentSellerKey, listings);

        // Also sync back to narrow_submitted_listings if it's a submitted listing
        const submittedRaw = localStorage.getItem('narrow_submitted_listings');
        if (submittedRaw) {
          try {
            const submittedList = JSON.parse(submittedRaw);
            const subTarget = submittedList.find(item => String(item.id) === String(id));
            if (subTarget) {
              subTarget.price = updatedPrice;
              subTarget.status = updatedStatus;
              localStorage.setItem('narrow_submitted_listings', JSON.stringify(submittedList));
            }
          } catch (err) {
            console.error('Error updating submitted listings store', err);
          }
        }
      }

      closeManageModal();
      renderListings();
    });
  }

  // Filter Tabs Event Listeners
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      currentStatusFilter = btn.getAttribute('data-status');
      renderListings();
    });
  });

  // Search Input Event Listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      renderListings();
    });
  }

  // Handle Log Out
  if (btnSellerLogout) {
    btnSellerLogout.addEventListener('click', () => {
      localStorage.removeItem('narrow_seller_session');
      window.location.href = 'seller-login.html?logout=true';
    });
  }

  // Hydrate Seller Profile
  const profile = mockSellersData[currentSellerKey] || {
    name: sessionUser.name,
    initials: sessionUser.initials,
    sellerId: sessionUser.sellerId,
    memberSince: sessionUser.memberSince || 'March 2024'
  };

  if (sellerAvatar) sellerAvatar.textContent = sessionUser.initials || profile.initials;
  if (sellerName) sellerName.textContent = sessionUser.name || profile.name;
  if (sellerIdText) sellerIdText.textContent = sessionUser.sellerId || profile.sellerId;
  if (sellerSinceText) sellerSinceText.textContent = sessionUser.memberSince || profile.memberSince;

  // Initialize Listings
  renderListings();
});
