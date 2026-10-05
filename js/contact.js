// contact.js - Contact form submission and validation
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      alert('Message Sent! We will get back to you shortly.');
      contactForm.reset();
    });
  }
});
