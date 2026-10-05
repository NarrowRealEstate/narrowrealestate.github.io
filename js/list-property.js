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

      if (uploadedFiles.length + validFiles.length > 15) {
        alert('You can upload a maximum of 15 photos.');
        return;
      }

      uploadedFiles.push(...validFiles);
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

    listingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!listingForm.checkValidity()) {
        listingForm.reportValidity();
        return;
      }

      // Capture submission data for Seller Portal integration
      const submittedProperty = {
        id: Date.now(),
        mls: `MLS #SUB-${Math.floor(1000 + Math.random() * 9000)}`,
        title: document.getElementById('propertyTitle')?.value || 'Newly Submitted Property',
        location: `${document.getElementById('propertyLocation')?.value || 'Pampanga'}, Philippines`,
        city: document.getElementById('propertyLocation')?.value || 'San Fernando',
        price: Number(document.getElementById('askingPrice')?.value) || 0,
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
      } else {
        alert('Listing Submitted Successfully! A representative will reach out within 3–5 business days to verify and finalize your listing.');
      }

      listingForm.reset();
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
    }
  }
});
