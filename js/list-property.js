// list-property.js - Seller listing submission, photo dropzone, file chips, and modal handling
document.addEventListener('DOMContentLoaded', () => {
  const listingForm = document.getElementById('listing-form');
  if (listingForm) {
    const uploadDropzone = document.getElementById('uploadDropzone');
    const propertyPhotosInput = document.getElementById('propertyPhotos');
    const filePreviewList = document.getElementById('filePreviewList');
    const submissionModal = document.getElementById('submissionModal');
    const btnModalClose = document.getElementById('btnModalClose');

    let uploadedFiles = [];

    const renderFilePreviews = () => {
      filePreviewList.innerHTML = '';
      uploadedFiles.forEach((file, index) => {
        const chip = document.createElement('div');
        chip.className = 'file-chip';
        chip.innerHTML = `
          <span class="file-chip-name">📷 ${file.name}</span>
          <button type="button" class="file-chip-remove" aria-label="Remove file" data-index="${index}">&times;</button>
        `;
        filePreviewList.appendChild(chip);
      });

      filePreviewList.querySelectorAll('.file-chip-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const idx = parseInt(btn.getAttribute('data-index'), 10);
          uploadedFiles.splice(idx, 1);
          const photoNotice = document.getElementById('photoLimitNotice');
          if (photoNotice && uploadedFiles.length < 15) {
            photoNotice.style.display = 'none';
          }
          renderFilePreviews();
        });
      });
    };

    const handleFiles = (files) => {
      const validFiles = Array.from(files).filter(file => {
        const isValidType = ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type);
        const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
        return isValidType && isValidSize;
      });

      const photoNotice = document.getElementById('photoLimitNotice');
      if (uploadedFiles.length + validFiles.length > 15) {
        if (photoNotice) photoNotice.style.display = 'block';
        const allowed = 15 - uploadedFiles.length;
        if (allowed > 0) {
          uploadedFiles.push(...validFiles.slice(0, allowed));
        }
      } else {
        if (photoNotice) photoNotice.style.display = 'none';
        uploadedFiles.push(...validFiles);
      }

      renderFilePreviews();
    };

    if (uploadDropzone && propertyPhotosInput) {
      uploadDropzone.addEventListener('click', () => {
        propertyPhotosInput.click();
      });

      propertyPhotosInput.addEventListener('change', (e) => {
        if (e.target.files) {
          handleFiles(e.target.files);
        }
      });

      ['dragenter', 'dragover'].forEach(eventName => {
        uploadDropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          uploadDropzone.classList.add('drag-active');
        });
      });

      ['dragleave', 'drop'].forEach(eventName => {
        uploadDropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          uploadDropzone.classList.remove('drag-active');
        });
      });

      uploadDropzone.addEventListener('drop', (e) => {
        if (e.dataTransfer && e.dataTransfer.files) {
          handleFiles(e.dataTransfer.files);
        }
      });
    }

    // Real-time comma formatting for asking price input
    const askingPrice = document.getElementById('askingPrice');
    if (askingPrice) {
      askingPrice.addEventListener('input', () => {
        askingPrice.setCustomValidity('');
        const prevVal = askingPrice.value;
        const cursor = askingPrice.selectionStart || 0;
        const rawDigits = prevVal.replace(/\D/g, '');

        if (!rawDigits) {
          askingPrice.value = '';
          return;
        }

        const formatted = Number(rawDigits).toLocaleString('en-US');
        const digitsBeforeCursor = prevVal.slice(0, cursor).replace(/\D/g, '').length;

        askingPrice.value = formatted;

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
        askingPrice.setSelectionRange(newCursor, newCursor);
      });
    }

    listingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!listingForm.checkValidity()) {
        listingForm.reportValidity();
        return;
      }

      // Validate asking price
      const rawPrice = askingPrice ? askingPrice.value.replace(/\D/g, '') : '';
      const parsedPrice = rawPrice ? parseInt(rawPrice, 10) : 0;

      if (!rawPrice || parsedPrice < 100000) {
        if (askingPrice) {
          askingPrice.setCustomValidity('Please enter an asking price of at least ₱100,000.');
          askingPrice.reportValidity();
        }
        return;
      }

      // Capture submission data for Seller Portal integration
      const submittedProperty = {
        id: Date.now(),
        mls: `MLS #SUB-${Math.floor(1000 + Math.random() * 9000)}`,
        title: document.getElementById('propertyTitle')?.value || 'Newly Submitted Property',
        location: `${document.getElementById('propertyLocation')?.value || 'Pampanga'}, Philippines`,
        city: document.getElementById('propertyLocation')?.value || 'San Fernando',
        price: parsedPrice,
        beds: Number(document.getElementById('bedrooms')?.value) || null,
        baths: Number(document.getElementById('bathrooms')?.value) || null,
        floorArea: Number(document.getElementById('floorArea')?.value) || null,
        lotArea: Number(document.getElementById('lotArea')?.value) || null,
        type: document.getElementById('propertyType')?.value || 'House & Lot',
        images: ['images/MLS000001/01.jpg'],
        status: 'Pending Review',
        views: 0,
        daysOnMarket: 1,
        inquiries: [],
        submittedBy: {
          name: document.getElementById('sellerName')?.value || 'Elena Vance',
          email: document.getElementById('sellerEmail')?.value || '',
          phone: document.getElementById('sellerPhone')?.value || ''
        }
      };

      try {
        const existing = JSON.parse(localStorage.getItem('narrow_submitted_listings') || '[]');
        existing.unshift(submittedProperty);
        localStorage.setItem('narrow_submitted_listings', JSON.stringify(existing));
      } catch (err) {
        console.error('Failed to save submitted listing', err);
      }

      // Show confirmation modal
      if (submissionModal) {
        submissionModal.classList.add('active');
      }

      listingForm.reset();
      const photoNotice = document.getElementById('photoLimitNotice');
      if (photoNotice) photoNotice.style.display = 'none';
      uploadedFiles = [];
      renderFilePreviews();
    });

    if (btnModalClose && submissionModal) {
      btnModalClose.addEventListener('click', () => {
        submissionModal.classList.remove('active');
      });

      submissionModal.addEventListener('click', (e) => {
        if (e.target === submissionModal) {
          submissionModal.classList.remove('active');
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && submissionModal.classList.contains('active')) {
          submissionModal.classList.remove('active');
        }
      });
    }
  }
});
