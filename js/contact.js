// contact.js - Contact form submission and validation
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const contactModal = document.getElementById('contactSuccessModal');
  const btnCloseModal = document.getElementById('btnContactModalClose');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      if (contactModal) {
        contactModal.classList.add('active');
      }

      contactForm.reset();
    });
  }

  if (btnCloseModal && contactModal) {
    btnCloseModal.addEventListener('click', () => {
      contactModal.classList.remove('active');
    });

    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        contactModal.classList.remove('active');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && contactModal.classList.contains('active')) {
        contactModal.classList.remove('active');
      }
    });
  }
});
