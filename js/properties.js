// properties.js - Catalog listing and reactive live filter engine
document.addEventListener('DOMContentLoaded', () => {
  const propertiesGrid = document.getElementById('properties-page-grid');
  if (propertiesGrid && typeof propertiesData !== 'undefined' && typeof renderProperties === 'function') {
    renderProperties(propertiesData, propertiesGrid, 'properties');

    const filterLocation = document.getElementById('filter-location');
    const filterType = document.getElementById('filter-type');
    const filterPrice = document.getElementById('filter-price');
    const filterBeds = document.getElementById('filter-beds');

    const applyFilters = () => {
      const locVal = filterLocation ? filterLocation.value : 'All';
      const typeVal = filterType ? filterType.value : 'All Types';
      const priceVal = filterPrice ? filterPrice.value : 'Any Price';
      const bedsVal = filterBeds ? filterBeds.value : 'Any';

      const filtered = propertiesData.filter(prop => {
        if (locVal !== 'All' && prop.city !== locVal) return false;
        if (typeVal !== 'All Types' && prop.type !== typeVal) return false;
        if (priceVal !== 'Any Price' && prop.price > parseInt(priceVal, 10)) return false;
        if (bedsVal !== 'Any') {
          const minBeds = parseInt(bedsVal, 10);
          if (!prop.beds || prop.beds < minBeds) return false;
        }
        return true;
      });

      renderProperties(filtered, propertiesGrid, 'properties');
    };

    [filterLocation, filterType, filterPrice, filterBeds].forEach(filterEl => {
      if (filterEl) {
        filterEl.addEventListener('change', applyFilters);
      }
    });
  }
});
