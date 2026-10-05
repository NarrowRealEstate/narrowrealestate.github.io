// seller-login.js - Seller Portal authentication and session controller

document.addEventListener('DOMContentLoaded', () => {
  // Approved Seller Credentials Store
  const approvedAccounts = [
    {
      key: 'elena',
      name: 'Elena Vance',
      initials: 'EV',
      sellerId: '#SEL-8821',
      email: 'elena@vance.ph',
      password: 'password123',
      memberSince: 'March 2024',
      agent: 'Raquel Rivera (Narrow RE)'
    },
    {
      key: 'marcus',
      name: 'Marcus Reyes',
      initials: 'MR',
      sellerId: '#SEL-4412',
      email: 'marcus@reyes.ph',
      password: 'password123',
      memberSince: 'January 2025',
      agent: 'Raquel Rivera (Narrow RE)'
    }
  ];

  // If already logged in, redirect directly to dashboard
  const existingSession = localStorage.getItem('narrow_seller_session');
  const urlParams = new URLSearchParams(window.location.search);
  const isExplicitLogout = urlParams.get('logout') === 'true';

  if (existingSession && !isExplicitLogout) {
    try {
      const parsed = JSON.parse(existingSession);
      if (parsed && parsed.key) {
        window.location.replace('seller-listings.html');
        return;
      }
    } catch (e) {
      localStorage.removeItem('narrow_seller_session');
    }
  }

  // DOM Elements
  const loginForm = document.getElementById('sellerLoginForm');
  const identifierInput = document.getElementById('sellerIdentifier');
  const passwordInput = document.getElementById('sellerPassword');
  const btnTogglePassword = document.getElementById('btnTogglePassword');
  const errorAlert = document.getElementById('loginErrorAlert');
  const errorMessage = document.getElementById('loginErrorMessage');

  // Password Visibility Toggle
  if (btnTogglePassword && passwordInput) {
    btnTogglePassword.addEventListener('click', () => {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      btnTogglePassword.textContent = isPassword ? '🙈' : '👁️';
      btnTogglePassword.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    });
  }

  // Hide error alert on input change
  const clearError = () => {
    if (errorAlert) {
      errorAlert.style.display = 'none';
    }
  };

  if (identifierInput) identifierInput.addEventListener('input', clearError);
  if (passwordInput) passwordInput.addEventListener('input', clearError);

  // Form Submit Handler
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const identifier = (identifierInput?.value || '').trim();
      const password = (passwordInput?.value || '').trim();

      if (!identifier || !password) {
        showError('Please enter both your Seller ID / Email and password.');
        return;
      }

      // Normalize search
      const cleanId = identifier.toLowerCase().replace(/\s+/g, '');

      const matchedUser = approvedAccounts.find(acc => {
        const idMatch = acc.sellerId.toLowerCase() === cleanId || acc.sellerId.replace('#', '').toLowerCase() === cleanId;
        const emailMatch = acc.email.toLowerCase() === cleanId;
        const keyMatch = acc.key.toLowerCase() === cleanId;
        return (idMatch || emailMatch || keyMatch) && acc.password === password;
      });

      if (matchedUser) {
        // Create authenticated session
        const sessionData = {
          key: matchedUser.key,
          name: matchedUser.name,
          initials: matchedUser.initials,
          sellerId: matchedUser.sellerId,
          email: matchedUser.email,
          memberSince: matchedUser.memberSince,
          agent: matchedUser.agent,
          loginTime: new Date().toISOString()
        };

        localStorage.setItem('narrow_seller_session', JSON.stringify(sessionData));
        localStorage.setItem('narrow_active_seller', matchedUser.key);

        // Redirect to Seller Listings Dashboard
        window.location.href = 'seller-listings.html';
      } else {
        showError('Invalid Seller ID/Email or password. Please verify credentials or use the demo accounts below.');
      }
    });
  }

  const showError = (msg) => {
    if (errorMessage) errorMessage.textContent = msg;
    if (errorAlert) {
      errorAlert.style.display = 'flex';
      errorAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };
});
