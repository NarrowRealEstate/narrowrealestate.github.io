// home.js - Homepage featured properties renderer
document.addEventListener('DOMContentLoaded', () => {
  const homeGrid = document.getElementById('home-properties-grid');
  if (homeGrid && typeof propertiesData !== 'undefined' && typeof renderProperties === 'function') {
    renderProperties(propertiesData.slice(0, 3), homeGrid, 'home');
  }
});
